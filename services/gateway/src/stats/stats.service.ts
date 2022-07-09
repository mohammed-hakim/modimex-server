import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { ProductDTO } from '@commerce/shared';
import { redis, redisStatsKey } from '../utils/redis';
import { config } from '@commerce/shared';

@Injectable()
export class StatsService {
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
  async storeRedis(keyData, msg) {
    // redis.del(redisStatsKey);
    return new Promise((resolve, reject) => {
      let key = JSON.stringify(keyData) + msg;
      redis.get(redisStatsKey, (err, data) => {
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
                  redisStatsKey,
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
  async get_stats(x = ''): Promise<ProductDTO> {
    return await this.storeRedis(x, 'get_stats');
  
  }

  async set_state(what, data: any): Promise<ProductDTO> {
    return new Promise((resolve, reject) => {
      this.client
        .send<ProductDTO>(what, data)
        .toPromise()
        .then(
          (product) => {
            redis.del(redisStatsKey);
            resolve(product);
          },
          (error) => reject(error),
        );
    });
  }

  async reset_state(what, data: any): Promise<ProductDTO> {
    return new Promise((resolve, reject) => {
      this.client
        .send<ProductDTO>(what, data)
        .toPromise()
        .then(
          (product) => {
            redis.del(redisStatsKey);
            resolve(product);
          },
          (error) => reject(error),
        );
    });
  }
}
