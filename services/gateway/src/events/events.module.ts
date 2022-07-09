import { EventResolver } from './events.resolver';
import { EventsService } from './events.service';
import { Module } from '@nestjs/common';

@Module({
  providers: [EventsService, EventResolver],
  exports: [EventsService],
})
export class EventsModule {}
