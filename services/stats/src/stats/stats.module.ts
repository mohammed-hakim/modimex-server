import { StatsEntity } from './stats.entity';
import { StatsController } from './stats.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { StatsService } from './stats.service';

@Module({
  providers: [StatsService],
  imports: [TypeOrmModule.forFeature([StatsEntity])],

  controllers: [StatsController],
})
export class StatsModule {}
