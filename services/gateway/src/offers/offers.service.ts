import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { config } from '@commerce/shared';
import { redis, redisOffersKey } from '../utils/redis';
@Injectable()
export class OffersService {
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
    // redis.del(redisOffersKey);
    return new Promise((resolve, reject) => {
      let key = JSON.stringify(keyData) + msg;
      redis.get(redisOffersKey, (err, data) => {
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
                  redisOffersKey,
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
  async get(data) {
    return await this.storeRedis(data, 'offers');
  }
  async show(data): Promise<any> {
    return await this.storeRedis(data, 'show-offer');
  }
  async fetchOffersByIds(ids: string[]) {
    return await this.storeRedis(ids, 'fetch-offers-by-ids');
  }
  async addOffers(data): Promise<any> {
    return await this.storeRedis(data, 'add-offers');
  }
  async search(data) {
    return await this.storeRedis(data, 'search-offer');
  }
  store(data: object): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client
        .send<any>('create-offer', {
          ...data,
        })
        .toPromise()
        .then(
          (offer) => {
            redis.del(redisOffersKey);
            return resolve(offer);
          },
          (error) => reject(error),
        );
    });
  }
  update(data: any, offerId: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.client
        .send<any>('update-offer', {
          data,
          id: offerId,
          user_id: id,
        })
        .toPromise()
        .then(
          (offer) => {
            redis.del(redisOffersKey);
            return resolve(offer);
          },
          (error) => reject(error),
        );
    });
  }
  destroy(offerId: string, id: string) {
    return new Promise((resolve, reject) => {
      this.client
        .send<any>('find-order-by-productId', offerId)
        .toPromise()
        .then((there_is) => {
          if (there_is) {
            resolve(there_is);
          } else {
            this.client
              .send<any>('delete-offer', {
                id: offerId,
                user_id: id,
              })
              .toPromise()
              .then(
                (offer) => {
                  redis.del(redisOffersKey);
                  return resolve(offer);
                },
                (error) => reject(error),
              );
          }
        });
    });
  }
}
