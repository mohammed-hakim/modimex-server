import { statisticsResponse } from './../dtoc/types';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { config } from '@commerce/shared';
import { Query, Resolver } from '@nestjs/graphql';
import { StatisticsService } from './statistics.service';

@Resolver(() => statisticsResponse)
export class StatisticsResolver {
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

  constructor(private readonly statisticsService: StatisticsService) {}

  @Query(() => statisticsResponse)
  async getStatistics() {
    return await this.statisticsService.get_statistics();
  }
}
