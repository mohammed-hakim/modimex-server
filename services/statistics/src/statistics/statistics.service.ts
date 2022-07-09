import { InjectRepository } from '@nestjs/typeorm';
import { StatisticsEntity } from './statistics.entity';
import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { Client, Transport, ClientProxy } from '@nestjs/microservices';
import { config } from '@commerce/shared';

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
  connectionORM: Connection;
  private client: ClientProxy;
  constructor(
    @InjectRepository(StatisticsEntity)
    private readonly statistics: Repository<StatisticsEntity>,
  ) {}
  async get(data = null) {
    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let repo = await this.statistics.findOne({ where: { day, month, year } });

    return repo;
  }
  async getAll(data = null) {
    let statistics = await this.statistics.find();
    statistics.forEach((x, i) => {
      statistics[i] &&
        (statistics[i].sells_data = JSON.stringify(x.sells_data) as any);
    });

    return { statistics };
  }

  async set({ products, quantity, price }) {
    let day = new Date().getDate();
    let month = new Date().getMonth();
    let year = new Date().getFullYear();
    let repo = await this.get();

    if (repo) {
      quantity = parseInt(quantity);
      price = parseInt(price);

      let conc = ` COALESCE(sells_quantity,0)::int + ${quantity}`;
      let conc2 = ` COALESCE(sells_price,0)::int + ${price}`;
      let x = await this.statistics.query(
        `
        UPDATE statistics 
        SET sells_quantity   = ${conc},
            sells_price      = ${conc2},
            sells_data = sells_data || '${JSON.stringify({ products })}'::jsonb

        where statistics.day   = ${day} 
          AND statistics.month = ${month} 
          AND statistics.year  = ${year};`,
        [],
      );
    } else {
      await this.statistics.save({
        month,
        year,
        day,
        sells_data: { products },
        sells_quantity: quantity,
        sells_price: price,
      });
    }
    return;
  }
}
