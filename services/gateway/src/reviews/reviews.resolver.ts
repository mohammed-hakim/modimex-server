import { ReviewsService } from './reviews.service';
import {
  Review,
  ReviewDTOC,
  ReviewResponse,
  userDTOC,
  P_Options,
  ReviewsResponse,
} from './../dtoc/types';

import { MyContext } from './../users/types';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { config } from '@commerce/shared';
import {
  Query,
  Resolver,
  Context,
  Mutation,
  Args,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '../middlewares/auth.guard';
import { UserDataLoader } from 'loaders/user.loader';

@Resolver(() => ReviewDTOC)
export class ReviewResolver {
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

  constructor(
    private revServ: ReviewsService,
    private usersDataLoader: UserDataLoader,
  ) {}
  @ResolveField('user', () => userDTOC, { nullable: true })
  async user(@Parent() review: any) {
    return await this.usersDataLoader.load(review.userId);
  }
  @Mutation(() => ReviewResponse)
  @UseGuards(new AuthGuard())
  async addReview(
    @Args('review') data: Review,
    @Context()
    {
      req: {
        session: { userId },
      },
    }: MyContext,
  ) {
    data['userId'] = userId;
    let x = this.revServ.add_review(data);
    console.log({ x });
    return x;
  }
  @Query(() => ReviewsResponse)
  @UseGuards(new AuthGuard())
  async getReviews(
    @Args('options') options: P_Options,
    @Args('id') id: String,
  ) {
    options['productId'] = id;
    let x = await this.revServ.getReviews(options as any);
    console.log({ x });
    return x;
  }

  @Mutation(() => Boolean)
  @UseGuards(new AuthGuard())
  async deleteReview(@Args('id') id: String) {
    return this.revServ.deleteReview(id);
  }
}
