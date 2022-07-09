import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { ProductDTO } from '@commerce/shared';

import { config } from '@commerce/shared';
// import { CreateProduct } from '@commerce/shared';
// `redis://111${config.REDIS_URL}:${config.REDIS_PORT}`

@Injectable()
export class EventsService {
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
  async add_event(data): Promise<ProductDTO> {
    return new Promise((resolve, reject) => {
      this.client.send<ProductDTO>('add_event', data).subscribe(
        (product) => resolve(product),
        (error) => reject(error),
      );
    });
  }
  async getEvents(data = {}): Promise<ProductDTO> {
    return new Promise((resolve, reject) => {
      this.client.send<ProductDTO>('get_events', data).subscribe(
        (product) => resolve(product),
        (error) => reject(error),
      );
    });
  }
  async deleteEvent(data): Promise<ProductDTO> {
    return new Promise((resolve, reject) => {
      this.client.send<ProductDTO>('delete_event', data).subscribe(
        (product) => resolve(product),
        (error) => reject(error),
      );
    });
  }
}
