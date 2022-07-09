import { InjectRepository } from '@nestjs/typeorm';
import { EventEntity } from './events.entity';
import { Injectable } from '@nestjs/common';
import {
  getConnection,
  getConnectionManager,
  getRepository,
  LessThan,
  MoreThan,
  Repository,
} from 'typeorm';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(EventEntity)
    private readonly event: Repository<EventEntity>,
  ) {}

  async addevent(data) {
    let ids = [
      'f5444434-5c2d-45ff-9dd2-6cd80a9a6de6',
      'dc9df4e3-89cd-43c5-9b86-0baa77a858c7',
      'd7c77de3-3fd9-4823-afc0-dabd58917ddc',
    ];
    // for (let i = 0; i < ids.length; i++) {
    //   const x = ids[i];
    //   data['productId'] = x;
    //   data['description'] = 'woow 9';
    //   let dt = await this.event.save(data);

    //   data['description'] = 'nice the first ' + i;
    //   dt = await this.event.save(data);
    //   data['description'] = 'care product ' + i;
    //   dt = await this.event.save(data);
    //   data['description'] = 'nice the owner ' + i;
    //   dt = await this.event.save(data);
    // }
    let event = await this.event.save(data);

    return {
      event,
      success: {
        sentence: 'Event created successfully',
        title: 'Event',
      },
    };

    //this.fetcheByProductsIds(ids);
    // this.get();
  }
  async get(data = {}) {
    let events = await this.event.find(data);
    return { events };
  }
  async deleteAll(data = {}) {
    let events = await this.event.delete({});

    return { events };
  }
  async delete_event(id) {
    await this.event.delete({ id });

    return {
      success: {
        sentence: 'Event deleted successfully',
        title: 'DELET',
      },
    };
  }
}
