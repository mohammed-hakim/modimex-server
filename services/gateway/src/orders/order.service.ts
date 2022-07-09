import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { ProductDTO, OrderDTO } from '@commerce/shared';

import { config } from '@commerce/shared';
import {
  redis,
  redisOffersKey,
  redisOrdersKey,
  redisProductsKey,
  redisUsersKey,
} from '../utils/redis';

@Injectable()
export class OrderService {
  @Client({
    transport: Transport.REDIS,
    options: {
      host: config.REDIS_HOST,
      url: `redis://${config.REDIS_HOST}:${config.REDIS_PORTE}`,
      port: config.REDIS_PORTE,
      password: config.REDIS_PASS,
    },
  })
  private client: ClientProxy;
  async inc_dec_order(order, what = 'inc', property, prices = []) {
    let prods = [];
    let offs = [];
    let data = [];
    let price = 0;
    let quantity = 0;
    (order.order.products as any).forEach((x, i) => {
      if (property == 'sells') {
        data.push({
          id: x.id || x.offerId,
          price: prices && prices[i],
          quantity: x.quantity,
          isOffer: x.offerId && true,
        });
        price += prices[i];
        quantity += x.quantity;
      }
      if (x.offerId) {
        offs.push({ id: x.offerId, quantity: x.quantity, price: x.price });
      } else {
        prods.push({ id: x.id, quantity: x.quantity, price: x.price });
      }
    });

    if (prods?.length) {
      await this.client
        .emit(what + '_product', { products: prods, property })
        .toPromise();
      redis.del(redisProductsKey);
    }
    if (offs?.length) {
      await this.client
        .emit(what + '_offer', { offers: offs, property })
        .toPromise();
      redis.del(redisOffersKey);
    }

    if (property == 'sells') {
      let ret = await this.client
        .emit('set_statistics', { products: data, price, quantity })
        .toPromise();
    }

    return order;
  }
  async storeRedis(keyData, msg) {
    console.log({keyData , msg});
    
    // redis.del(redisOrdersKey);
    return new Promise((resolve, reject) => {
      let key = JSON.stringify(keyData) + msg;
      redis.get(redisOrdersKey, (err, data) => {
        let products = null;

        if (data) {
          products = JSON.parse(data)[key];
        }
        if (!products) {
          return this.client
            .send<any>(msg, keyData)
            .toPromise()
            .then(
              (products) => {
                let df = {
                  ...(JSON.parse(data) as any),
                };
                df[key] = products;
                redis.set(
                  redisOrdersKey,
                  JSON.stringify(df),
                  'EX',
                  60 * 60 * 60 * 24 * 3,
                );
                return resolve(products);
              },
              (error) => reject(error),
            );
        }
        resolve(products);
      });
    });
  }

  async indexOrdersByUser(data) {
    return await this.storeRedis(data, 'index-orders');
  }
  async getAllOrders(data) {
    return await this.storeRedis(data, 'all-orders');
  }

  upStatus({ total, totalNoPromo, code, ...data }, userId, prices) {
    return new Promise((resolve, reject) => {
      this.client
        .send('order_charged', data)
        .toPromise()
        .then(async (order) => {
          redis.del(redisOrdersKey);

          if (data.status == 'succeeded') {
            await this.inc_dec_order(order, 'inc', 'sells', prices);
            await this.client
              .emit('order_completed', {
                total,
                totalNoPromo,
                products: order.order.products,
                code,
                userId,
              })
              .toPromise();
            let g = await redis.get(redisUsersKey);
            console.log({ g });

            await redis.del(redisUsersKey);
            g = await redis.get(redisUsersKey);
            console.log({ g2: g });
          } else if (data.status == 'failed') {
            await this.inc_dec_order(order, 'inc', 'quantity');
          }

          return resolve(order);
        });
    });
  }
  createOrder(all, userId, shipping, code) /*  */ {
    return new Promise(async (resolve, reject) => {
      let products = all.filter((x) => {
        return x.id;
      });
      let offers = all.filter((x) => {
        return x.offerId;
      });
      let Tprods = products.map((product) => product.id);

      let Toffers = offers.map((product) => product.offerId);
      let arr = [];

      let dt = await Promise.all([
        Tprods.length &&
          this.client
            .send<any>('fetch-products-by-ids', { ids: Tprods })
            .toPromise(),
        Toffers.length &&
          this.client.send<any>('fetch-offers-by-ids', Toffers).toPromise(),
      ]);

      let [prods, offs] = dt;

      let errors = [];
      let prodsOffers = [];
      let fetchedProdsOffers = [];
      if (prods.length) {
        const filteredProducts = products.filter((product) => {
          const p = prods.find((p) => p.id === product.id);

          let val = p.quantity >= product.quantity;

          if (!val) {
            errors.push({
              field: 'products',
              title: p.title,
              msg: `${p.title} is out of stock at the moment, try with lower the amount.`,
            });
          }

          return val;
        });

        if (filteredProducts.length != products.length) {
          return reject(errors);
        }
        prodsOffers.push(...products);
        fetchedProdsOffers.push(...prods);
      }

      if (offs.length) {
        const filteredOffers = offers.filter((product) => {
          const p = offers.find((p) => p.offerId === product.offerId);
          let val = p.quantity >= product.quantity;

          if (!val) {
            errors.push({
              field: 'offers',
              title: p.title,
              msg: `${p.title} is out of stock at the moment, try with lower the amount.`,
            });
          }

          return val;
        });
        if (filteredOffers.length != offers.length) {
          return reject(errors);
        }
        prodsOffers.push(...offers);
        fetchedProdsOffers.push(...offs);
      }

      //console.log({errors});
      

      let x = await this.store(
        prodsOffers,
        userId,
        shipping,
        code,
        fetchedProdsOffers,
      );
      redis.del(redisOrdersKey);
      resolve(x);
    });
  }
  async destroyUserOrder(order_id: any, user_id): Promise<OrderDTO> {
    return new Promise((resolve, reject) => {
      this.client
        .send('destroy-order-by-id', {
          id: order_id,
          user_id,
        })
        .toPromise()
        .then(async (order) => {
          redis.del(redisOrdersKey);
          resolve(order);
        });
    });
  }
  store(
    products: any,
    user_id,
    shipping,
    code,
    fetchedProducts,
  ): Promise<ProductDTO> {
    return new Promise((resolve, reject) => {
      const mappedProducts = fetchedProducts
        .map((product) => {
          let p = products.find((p) => (p.id || p.offerId) === product.id);

          if (p) {
            return {
              ...product,
              ordered_quantity: p.quantity,
              color: p.color,
              size: p.size,
              offerId: p.offerId,
              children: p.children,
            };
          }
          return product;
        })
        .filter((product) => !!product.ordered_quantity);

      this.client
        .send('create_order', {
          products: mappedProducts,
          user_id,
          shipping,
          code,
        })
        .toPromise()
        .then(
          async (order) => {
            let offs = products.filter((x) => {
              return x.offerId;
            });
            offs = offs.map((x) => {
              return { ...x, id: x.offerId };
            });
            let prods = products.filter((x) => {
              return !x.offerId;
            });
            console.log({ prods, offs });

            await this.client.emit('dec_offer', { offers: offs }).toPromise();
            await this.client
              .emit('update_user', {
                id: user_id,
                phone: JSON.parse(shipping).phone,
                adress: JSON.parse(shipping).adress,
              })
              .toPromise();
            this.client
              .emit('dec_product', { products: prods })
              .toPromise()
              .then(() => resolve(order)); // resolve on completion
          },
          (error) => reject(error),
        );
    });
  }
}
