import { downAll } from 'utils/useful';
import { EventsService } from './events.service';
import {
  Event,
  EventDTOC,
  EventResponse,
  EventsResponse,
  SimpleResponse,
} from './../dtoc/types';

import { MyContext } from './../users/types';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { config } from '@commerce/shared';
import { Query, Resolver, Context, Mutation, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../middlewares/auth.guard';
import { FileUpload, GraphQLUpload } from 'graphql-upload';

@Resolver(() => EventDTOC)
export class EventResolver {
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

  constructor(private eventsServ: EventsService) {}
  @Query(() => EventsResponse)
  async getEvents() {
    return await this.eventsServ.getEvents();
  }
  @Mutation(() => EventResponse)
  @UseGuards(new AuthGuard())
  async addEvent(
    @Context()
    {
      req: {
        session: { userId },
      },
    }: MyContext,
    @Args('event') data: Event,
    @Args('token', { nullable: true }) token: String,
    @Args({ name: 'images', type: () => [GraphQLUpload], nullable: true })
    IMGS: FileUpload[],
  ) {
    let paths = await downAll(IMGS, token, true);

    data['images'] = IMGS.length
      ? paths[0]
      : ['http://localhost:2600/images/default.jpg'];
    data['blured_images'] = IMGS.length
      ? paths[1]
      : ['http://localhost:2600/images/default.jpg'];
    data['creator'] = userId;
    return this.eventsServ.add_event(data);
  }

  @Mutation(() => SimpleResponse)
  @UseGuards(new AuthGuard())
  async deleteEvent(@Args('id') id: String) {
    return this.eventsServ.deleteEvent(id);
  }
}
