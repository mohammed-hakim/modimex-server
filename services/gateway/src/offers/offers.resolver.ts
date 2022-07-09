import { ProductsDataLoader } from './../loaders/products.loader';
import { Offer, ReviewDTOC } from './../dtoc/types';
import { ReviewsDataLoader } from '../loaders/reviews.loader';
import {
  userDTOC,
  OfferDTOC,
  OfferResponse,
  OffersResponse,
  P_Options,
  SimpleResponse,
} from '../dtoc/types';

import { MyContext } from '../users/types';
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
  Info,
} from '@nestjs/graphql';

import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { UserDataLoader } from '../loaders/user.loader';
import { searchFields, downAll } from '../utils/useful';
import { OffersService } from './offers.service';

@Resolver(() => OfferDTOC)
export class OfferResolver {
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
    private readonly OfferService: OffersService,
    private readonly usersDataLoader: UserDataLoader,
    private readonly revsDataLoader: ReviewsDataLoader,
    private readonly ProdsDataLoader: ProductsDataLoader,
  ) {}

  @ResolveField('products', () => userDTOC, { nullable: true })
  async products(@Parent() offer: any): Promise<any> {
    return await this.ProdsDataLoader.load(offer.products_ids);
  }

  @ResolveField('reviews', () => [ReviewDTOC], { nullable: true })
  async reviews(@Parent() offer: any) {
    let dt = await this.revsDataLoader.load(offer.id);

    for (let i = 0; i < dt.length; i++) {
      const x = dt[i];
      x.user = await this.usersDataLoader.load(x.userId);
    }

    return dt;
  }
  @Query(() => OffersResponse)
  async getOffers(
    @Args('options', { nullable: true }) args: P_Options,
    @Context()
    {
      req: {
        session: { userId },
      },
    }: MyContext,
    @Info() info,
  ) {
    let select = await searchFields({
      info,
      search: 'offers',
      none: ['user', 'reviews'],
    });

    if (args.mine) {
      args['id'] = userId;
    }

    args['select'] = select;

    return await this.OfferService.get(args);
  }

  @Query(() => OffersResponse)
  async search_offers(@Args('options', { nullable: true }) args: P_Options) {
    return await this.OfferService.search(args);
  }

  @Query(() => OfferResponse)
  async showOffer(@Args('id') id: string, @Info() info) {
    // let select = await searchFields({
    //   info,
    //   search: 'Offer',
    //   none: ['user', 'reviews'],
    // });

    let d = await this.OfferService.show({ id });
    return d;
  }

  @Mutation(() => OfferResponse)
  async addOffer(
    @Context()
    {
      req: {
        session: { userId },
      },
    }: MyContext,
    @Args('data', { nullable: true }) data: Offer,
    @Args('token', { nullable: true }) token: String,
    @Args({ name: 'images', type: () => [GraphQLUpload], nullable: true })
    IMG: FileUpload[],
  ) {
    let paths = await downAll(IMG, token);
    data['user_id'] = userId;
    data['images'] = IMG.length
      ? paths[0]
      : ['http://localhost:2600/images/default.jpg'];
    data['blured_images'] = IMG.length
      ? paths[1]
      : ['http://localhost:2600/images/default.jpg'];
    let x = await this.OfferService.store(data);
    return x;
  }

  @Mutation(() => OfferResponse)
  async updateOffer(
    @Args('data') data: Offer,
    @Context() { req }: MyContext,
    @Args('id') id: string,
  ) {
    
    let x = await this.OfferService.update(data, id, req.session.userId);
    
    return x;
  }

  @Mutation(() => SimpleResponse)
  async deleteOffer(
    @Context()
    {
      req: {
        session: { userId },
      },
    }: any,
    @Args('id') id: string,
  ) {
    return this.OfferService.destroy(id, userId);
  }
}
