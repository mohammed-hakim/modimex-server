import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { config } from '@commerce/shared';
import { redis, redisReviewsKey } from '../utils/redis';
@Injectable()
export class ReviewsService {
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
    redis.del(redisReviewsKey);
    return new Promise((resolve, reject) => {
      let key = JSON.stringify(keyData) + msg;
      redis.get(redisReviewsKey, (err, data) => {
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
                  redisReviewsKey,
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
  async add_review(data) {
    return new Promise((resolve, reject) => {
      this.client
        .send<any>('add_review', data)
        .toPromise()
        .then(
          (product) => {
            redis.del(redisReviewsKey);
            resolve(product);
          },
          (error) => reject(error),
        );
    });
  }
  async deleteReview(data) {
    return new Promise((resolve, reject) => {
      this.client
        .send<any>('delete_review', data)
        .toPromise()
        .then(
          (product) => {
            redis.del(redisReviewsKey);
            resolve(product);
          },
          (error) => reject(error),
        );
    });
  }
  async fetchReviewsByIds(ids, skip = 0, limit = 5) {
    return await this.storeRedis(
      {
        ids,
        skip,
        limit,
      },
      'fetche_by_products_ids',
    );
  }
  async getReviews({ skip = 5, limit = 5, productId }) {
    return await this.storeRedis(
      {
        skip,
        limit,
        productId,
      },
      'get_reviews',
    );
  }
}
