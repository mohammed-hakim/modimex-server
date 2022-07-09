import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, HttpException } from '@nestjs/common';
import { Repository, Not, getConnection } from 'typeorm';
import { config, errors, success } from '@commerce/shared';
import { OrderEntity as Order, OrderEntity } from './order.entity';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';

const { INVALID_ID } = errors;
const {
  DELETE_ORDER,
  DELETE_ORDER_EVER,
  UPDATE_ORDER,
  NEW_ORDER,
  INVALID_PROMO,
} = success;

const relatedProducts = (x) => {
  return [
    {
      title: 'Delete Product Canceled',
      sentence: `there is ${x} order${
        x > 1 ? 's' : ''
      } that contains this product !`,
    },
  ];
};

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
  constructor(
    @InjectRepository(Order)
    private readonly orders: Repository<Order>,
  ) {}
  async get({ userId, cursor, limit = 20, skip = null, status: statuss }) {
    let arr = [limit + 1, userId];
    let orders = await this.orders.query(
      `
     select p.*
     from orders p

     where (( 

     p."user_id" = $2
     and p."status" != 'succeeded' 
     ${cursor ? `and p."created_at"::timestamptz <= $3` : ''} 

     ) or (

    p."user_id" = $2
    and   p."status" = 'succeeded' 
  
    ${cursor ? `and p."created_at"::timestamptz <= $3` : ''} 
    
    )
    AND 
    (
      NOT p."hide" = TRUE
    )
    )

    ${statuss ? `AND p."status" = ANY ('{${statuss}}'::text[])` : ''} 
    
    order by p."created_at" DESC
    limit $1
    ${skip ? `offset ${skip} ` : ''}
     `,
      arr,
    );

    let more = orders.length == limit + 1;
    more && (orders = orders.splice(0, orders.length - 1));
    orders.forEach((x) => {
      x.products = x?.vals?.products;
    });
    orders = this.transf(orders);

    return { orders, more };
  }
  async getAll({ cursor, limit = 20, skip = null, status: statuss }) {
    let arr = [limit + 1];
    let orders = await this.orders.query(
      `
     select p.*
     from orders p

    where
    (
      (
        ( 
          p."status" != 'succeeded' 
          ${cursor ? `and p."created_at"::timestamptz <= $2` : ''}
        )  

        OR 

        (
          p."status" = 'succeeded' 
          ${cursor ? `and p."updated_at"::timestamptz <= $2` : ''} 
        )
      )
      AND 
      (
        NOT p."hide" = TRUE
      )
      ${statuss ? `AND p."status" = ANY ('{${statuss}}'::text[])` : ''} 
    )
    
    
     
     order by p."updated_at" DESC
     limit $1
     ${skip ? `offset ${skip} ` : ''}
     `,
      arr,
    );

    let more = orders.length == limit + 1;
    more && (orders = orders.splice(0, orders.length - 1));
    orders.forEach((x) => {
      x.products = x?.vals?.products;
    });

    orders = this.transf(orders);

    return { orders, more };
  }

  async update(id: string, data: any) {
    let order = (await this.orders.findOne({ id })) as any;
    if (!order) throw new HttpException([INVALID_ID], 404);

    order = (await this.orders
      .createQueryBuilder()
      .update(OrderEntity)
      .set(data)
      .where('id = :id ', { id })
      .returning('*')
      .execute()) as any;

    return { order };
  }

  async markOrderStatus({ id, status, failedReason }) {
    await this.orders.update(id, {
      status,
      failedReason,
    });

    let order = await this.orders.findOne({ id });
    if (!order) throw new HttpException([INVALID_ID], 404);
    order.products = order?.vals?.products;

    return {
      order,
      success: UPDATE_ORDER,
    };
  }
  async findByIdAndUserId(id, user_id) {
    let p = await this.orders.findOne({ id, user_id });
    if (!p) throw new HttpException([INVALID_ID], 404);
    return p;
  }
  async finWithProductId(id) {
    let f = await this.orders.query(`
    SELECT p."vals" ,p."status"
    FROM   orders p
    WHERE   p."status" = 'pending' and  vals->'products' @> ANY (ARRAY ['[{"id":"${id}"}]']::jsonb[]) AND 
    (
      NOT p."hide" = TRUE
    );
 `);
    if (f.length) {
      return { errors: relatedProducts(f.length) };
    } else {
      return false;
    }
  }
  async create({ products, user_id, shipping, code }) /* : Promise<Order> */ {
    const INITIAL_VALUE = 0;
    const total_price = products.reduce(
      (accumulator, product) =>
        accumulator + product.ordered_quantity * product.price,
      INITIAL_VALUE,
    );

    const databaseProducts = products.map((product) => {
      let dt = {
        id: product.id,
        quantity: product.ordered_quantity,
        color: product.color,
        size: product.size,
        children: product.children,
      };
      if (product.offerId) {
        dt['offerId'] = product.offerId;
      }
      return dt;
    });

    const actualProducts = products.map((product) => {
      product.quantity = product.quantity - product.ordered_quantity;
      delete product.ordered_quantity;
      return { ...product };
    });
    products = databaseProducts;
    let dota = {
      vals: { products },
      user_id,
      shipping,
      total_price,
    };

    let errors = [];
    if (code) {
      let valid = await this.client.send('find_promo', code).toPromise();
      if (valid) {
        await this.client.send('add_promo_user', valid).toPromise();
      }

      if (valid) {
        dota['code'] = valid;
      } else {
        errors = [INVALID_PROMO];
      }
    }

    const order = await this.orders.create(dota);
    await this.orders.save(order);
    order.products = actualProducts;

    return {
      order,
      errors,
      success: NEW_ORDER,
    };
  }
  async destroy({ id, user_id }) {
    try {
      if (!id || !user_id) {
        throw new HttpException([INVALID_ID], 404);
      }
      const order = await this.orders.findOne({
        where: { id, user_id },
      });

      if (!order) {
        throw new HttpException([INVALID_ID], 404);
      }

      this.update(order.id, { hide: true });

      order.products = order?.vals?.products;

      return {
        order,
        success: DELETE_ORDER,
      };
    } catch (error) {
      return { errors: [INVALID_ID] };
    }
  }
  async destroyEver({ id, user_id }) {
    try {
      if (!id || !user_id) {
        throw new HttpException([INVALID_ID], 404);
      }
      const order = await this.orders.findOne({
        where: { id, user_id },
      });

      if (!order) {
        throw new HttpException([INVALID_ID], 404);
      }

      await this.orders.delete({ id });
      order.products = order?.vals?.products;
      return {
        order,
        success: DELETE_ORDER_EVER,
      };
    } catch (error) {
      return { errors: [INVALID_ID] };
    }
  }
  transf(data) {
    for (let i = 0; i < data.length; i++) {
      data[i] = this.transfS(data[i]);
    }
    return data;
  }
  transfS(data) {
    let code = data?.code;
    if (code && typeof code == 'string') {
      data.code = JSON.parse(code);
    }
    return data;
  }
}
