import { StatsResolver } from './stats.resolver';
import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';

@Module({
  providers: [StatsService, StatsResolver],

  exports: [StatsService],
})
export class StatsModule {}
