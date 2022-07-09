import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StatisticsEntity } from './statistics.entity';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './stats.controller';

@Module({
  providers: [StatisticsService],
  imports: [TypeOrmModule.forFeature([StatisticsEntity])],

  controllers: [StatisticsController],
})
export class StatisticsModule {}
