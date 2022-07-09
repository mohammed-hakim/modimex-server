import { StatisticsResolver } from './statistics.resolver';
import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Module({
  providers: [StatisticsService, StatisticsResolver],

  exports: [StatisticsService],
})
export class StatisticsModule {}
