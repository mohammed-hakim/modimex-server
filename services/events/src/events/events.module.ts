import { EventEntity } from './events.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';

@Module({
  providers: [EventsService],
  imports: [TypeOrmModule.forFeature([EventEntity])],

  controllers: [EventsController],
})
export class EventsModule {}
