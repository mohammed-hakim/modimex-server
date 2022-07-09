import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { ProductDTO } from '@commerce/shared';
import { config } from '@commerce/shared';
// import { CreateProduct } from '@commerce/shared';

@Injectable()
export class StatisticsService {
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
  async get_statistics(x = ''): Promise<ProductDTO> {
    return new Promise((resolve, reject) => {
      this.client
        .send<ProductDTO>('get_statistics', x)
        .toPromise()
        .then(
          (product) => resolve(product),
          (error) => reject(error),
        );
    });
  }

  async set_state(what, data: any): Promise<ProductDTO> {
    return new Promise((resolve, reject) => {
      this.client
        .send<ProductDTO>(what, data)
        .toPromise()
        .then(
          (product) => resolve(product),
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
          (product) => resolve(product),
          (error) => reject(error),
        );
    });
  }
}
