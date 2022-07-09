import { ReviewsDataLoader } from './../loaders/reviews.loader';
import {
  userDTOC,
  ProductDTOC,
  ProductResponse,
  ProductsResponse,
  P_Options,
  SimpleResponse,
} from './../dtoc/types';

import { MyContext } from './../users/types';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import { ProductDTO, UserDTO, config, URL } from '@commerce/shared';
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

import { CreateProduct, UpdateProduct } from './create-product.validation';
import { ProductService } from './product.service';
import { GraphQLUpload, FileUpload } from 'graphql-upload';
import { UserDataLoader } from '../loaders/user.loader';
import { searchFields, downAll } from 'utils/useful';

@Resolver(() => ProductDTOC)
export class ProductResolver {
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
    private readonly productService: ProductService,
    private readonly usersDataLoader: UserDataLoader,
    private readonly revsDataLoader: ReviewsDataLoader,
  ) {}
  @ResolveField('user', () => userDTOC, { nullable: true })
  async user(@Parent() product: ProductDTO): Promise<UserDTO> {
    return await this.usersDataLoader.load(product.user_id);
  }

  @ResolveField('reviews', () => [String], { nullable: true })
  async reviews(@Parent() product: ProductDTO): Promise<UserDTO> {
    let dt = await this.revsDataLoader.load(product.id);

    for (let i = 0; i < dt.length; i++) {
      const x = dt[i];
      x.user = await this.usersDataLoader.load(x.userId);
    }

    return dt;
  }
  @Query(() => ProductsResponse)
  async products(
    @Args('options', { nullable: true }) args: P_Options,
    @Context()
    {
      req: {
        session: { userId },
      },
    }: MyContext,
    @Info() info,
  ) {
    // let select = await searchFields({
    //   info,
    //   search: 'products',
    //   none: ['user', 'reviews'],
    // });

    if (args.mine) {
      args['id'] = userId;
    }

    let x = (await this.productService.get(args)) as any;

    return x;
  }
  @Query(() => ProductsResponse)
  async fetchProductsByIds(
    @Args('options', { nullable: true }) { ids, ids2, select }: P_Options,
    @Context()
    {
      req: {
        session: { userId },
      },
    }: MyContext,
    @Info() info,
  ) {
    let products;

    if (ids2) {
      products = await this.productService.fetchProductsByIdsSELECT(
        ids2,
        select,
      );
    } else {
      console.log(39, { ids, ids2 });

      products = await this.productService.fetchProductsByIds(
        ids as any,
        select,
      );
    }

    return { products };
  }
  @Query(() => ProductsResponse)
  async search(@Args('options', { nullable: true }) args: P_Options) {
    return await this.productService.search(args);
  }
  @Query(() => ProductsResponse)
  async mine_products(
    @Args('options', { nullable: true }) args: P_Options,
    @Context()
    {
      req: {
        session: { userId },
      },
    }: MyContext,
  ) {
    args['id'] = userId;
    let x = await this.productService.get_mine(args);

    return x;
  }
  @Query(() => ProductResponse)
  async showProduct(@Args('id') id: string, @Info() info) {
    let select = await searchFields({
      info,
      search: 'product',
      none: ['user', 'reviews'],
    });

    let d = await this.productService.show({ id, select });
    return d;
  }

  @Mutation(() => ProductResponse)
  async createProduct(
    @Context()
    {
      req: {
        session: { userId },
      },
    }: MyContext,
    @Args('data', { nullable: true }) data: CreateProduct,
    @Args('token', { nullable: true }) token: String,
    @Args({ name: 'images', type: () => [GraphQLUpload], nullable: true })
    IMG: FileUpload[],
  ) {
    let paths = await downAll(IMG, token);

    data['images'] = IMG.length
      ? paths[0]
      : ['http://localhost:2600/images/default.jpg'];
    data['blured_images'] = IMG.length
      ? paths[1]
      : ['http://localhost:2600/images/default.jpg'];
    let x = await this.productService.store(data, userId);
    return x;
  }

  @Mutation(() => ProductResponse)
  async updateProduct(
    @Args('data') data: UpdateProduct,
    @Context() { req }: MyContext,
    @Args('id') id: string,
  ) {
    console.log({ id }, 'upp');

    let x = await this.productService.update(data, id, req.session.userId);
    return x;
  }
  @Mutation(() => SimpleResponse)
  async deleteProduct(
    @Context()
    {
      req: {
        session: { userId },
      },
    }: any,
    @Args('id') id: string,
  ) {
    return this.productService.destroy(id, userId);
  }
}
