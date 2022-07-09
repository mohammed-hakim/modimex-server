import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly events: EventsService) {}

  @MessagePattern('add_event')
  async index(data: any = undefined) {
    return await this.events.addevent(data);
  }
  @MessagePattern('get_events')
  async get(data: any = undefined) {
    return await this.events.get(data);
  }
  @MessagePattern('delete_event')
  async delete_event(id: any = undefined) {
    return await this.events.delete_event(id);
  }
}
