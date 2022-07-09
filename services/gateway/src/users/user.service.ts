import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { UserDTO, RegisterUser, LoginUser } from '@commerce/shared';
import { ObjectID } from 'typeorm';
import { config } from '@commerce/shared';
import { redis, redisUsersKey } from '../utils/redis';

@Injectable()
export class UserService {
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
  async get(data): Promise<UserDTO[]> {
    const response = await this.client.send<UserDTO[]>('users', data);
    return response.toPromise();
  }
  async storeRedis(keyData, msg) {
    return new Promise((resolve, reject) => {
      let key = JSON.stringify(keyData) + msg;
      redis.get(redisUsersKey, (err, products) => {
        if (!products) {
          return this.client
            .send<any>(msg, keyData)
            .toPromise()
            .then(
              (products) => {
                redis.set(
                  key,
                  JSON.stringify(products),
                  'EX',
                  60 * 60 * 60 * 24 * 3,
                );
                return resolve(products);
              },
              (error) => reject(error),
            );
        }
        resolve(JSON.parse(products));
      });
    });
  }
  async login(data: LoginUser): Promise<UserDTO> {
    return new Promise((resolve, reject) => {
      this.client
        .send<UserDTO>('login-user', data)
        .toPromise()
        .then(
          (response) => resolve(response),
          (error) => reject(error),
        );
    });
  }
  async register(data: RegisterUser): Promise<UserDTO> {
    const response = this.client.send<UserDTO>('register-user', data);

    return response.toPromise();
  }

  async me(id: ObjectID) {
    return await this.storeRedis(id, 'current-loggedin-user');
  }

  async findWithEmail(email) {
    return await this.storeRedis(email, 'find-user-email');
  }
  async search(data) {
    return await this.storeRedis(data, 'search_users');
  }
  async findById(data) {
    return await this.storeRedis(data, 'findById');
  }

  async customQR(func, data) {
    return await this.storeRedis(data, func);
  }
  async fetchUsersByIds(ids: string[]): UserDTO {
    return await this.storeRedis(ids, 'fetch-users-by-ids');
  }
  async customMT(func, data) {
    return new Promise((resolve, reject) => {
      this.client
        .send<UserDTO>(func, data)
        .toPromise()
        .then(
          (response) => {
            {
              redis.del(redisUsersKey);
              resolve(response);
            }
          },
          (error) => {
            reject(error);
          },
        );
    });
  }
  updateUser(data) {
    return new Promise((resolve, reject) => {
      this.client
        .send<UserDTO>('update_user', data)
        .toPromise()
        .then(
          async (user) => {
            //redis.flushdb();
            console.log('updated');
            
            redis.del(redisUsersKey);;
            return resolve(user);
          },
          (error) => reject(error),
        );
    });
  }
}
