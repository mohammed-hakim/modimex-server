import { redisStatsKey } from './../utils/redis';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { ProductDTO } from '@commerce/shared';
import { config } from '@commerce/shared';
import { redis, redisProductsKey } from '../utils/redis';
import { CreateProduct } from '@commerce/shared';
@Injectable()
export class ProductService {
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

  async addMany(data): Promise<ProductDTO> {
    return new Promise((resolve, reject) => {
      this.client
        .send<ProductDTO>('add-products', data)
        .toPromise()
        .then(
          (product) => resolve(product),
          (error) => reject(error),
        );
    });
  }
  async get_mine(data): Promise<ProductDTO[]> {
    return new Promise((resolve, reject) => {
      this.client
        .send<ProductDTO>('mine-products', data)
        .toPromise()
        .then(
          (product) => resolve(product),
          (error) => reject(error),
        );
    });
  }

  async storeRedis(keyData, msg) {
    // redis.del(redisProductsKey);
    return new Promise((resolve, reject) => {
      let key = JSON.stringify(keyData) + msg;
      redis.get(redisProductsKey, (err, data) => {
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
                  redisProductsKey,
                  JSON.stringify(df),
                  'EX',
                  60 * 60 * 60 * 24 * 3, // 3 days until expiration
                );
                return resolve(products);
              },
              (error) => reject(error),
            );
        }
        // return the parsed products from cache.
        resolve(products);
      });
    });
  }
  async show(data): Promise<ProductDTO> {
    return await this.storeRedis(data, 'show-product');
  }

  async get(data) {
    return await this.storeRedis(data, 'products');
  }
  async search(data) {
    return await this.storeRedis(data, 'search');
  }

  store(data: CreateProduct, id: string): Promise<ProductDTO> {
    return new Promise((resolve, reject) => {
      this.client
        .send<ProductDTO>('create-product', {
          ...data,
          user_id: id,
        })
        .toPromise()
        .then(
          async (product) => {
            redis.del(redisProductsKey);
            return resolve(product);
          },
          (error) => reject(error),
        );
    });
  }
  update(
    data: CreateProduct,
    productId: string,
    id: string,
  ): Promise<ProductDTO> {
    return new Promise((resolve, reject) => {
      this.client
        .send<ProductDTO>('update-product', {
          ...data,
          id: productId,
          user_id: id,
        })
        .toPromise()
        .then(
          async (product) => {
            //redis.flushdb();
            redis.del(redisProductsKey);
            redis.del(redisStatsKey);
            return resolve(product);
          },
          (error) => reject(error),
        );
    });
  }
  async fetchProductsByIds(ids, select = null) {
    return (await this.storeRedis(
      { ids, select },
      'fetch-products-by-ids',
    )) as any;
  }
  async fetchProductsByIdsSELECT(ids, select) {
    return (await this.storeRedis(
      { ids, select },
      'fetch-products-by-ids-select',
    )) as any;
  }
  destroy(productId: string, id: string) {
    return new Promise((resolve, reject) => {
      this.client
        .send<ProductDTO>('find-order-by-productId', productId)
        .toPromise()
        .then(
          (there_is) => {
            if (there_is) {
              resolve(there_is);
            } else {
              this.client
                .send<ProductDTO>('delete-product', {
                  id: productId,
                  user_id: id,
                })
                .toPromise()
                .then(
                  async (product) => {
                    redis.del(redisProductsKey);
                    return resolve(product);
                  },
                  (error) => reject(error),
                );
            }
          },
          (error) => reject(error),
        );
    });
  }
}
