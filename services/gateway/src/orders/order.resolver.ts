import { ProductsDataLoaderSELECT } from './../loaders/products.loader';
import { OrderOfferDataLoader } from './../loaders/order-offer.loader';
import { AdminGuard } from './../middlewares/admin.guard';
import {
  ProductDTOC,
  orderDTOC,
  OrdersResponse,
  OrderResponse,
  P_Options,
  SimpleResponse,
} from './../dtoc/types';
import { Client, ClientProxy, Transport } from '@nestjs/microservices';
import {
  Resolver,
  Context,
  Mutation,
  Args,
  Query,
  Parent,
  ResolveField,
  InputType,
  Field,
  Int,
  Float,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { config, ProductDTO, OrderDTO, UserDTO } from '@commerce/shared';
import { AuthGuard } from '../middlewares/auth.guard';
import { CreateOrder } from './create-order.validation';
import { OrderProductDataLoader } from '../loaders/order-product.loader';
import { OrderService } from './order.service';
import { UUID } from '../shared/validation/uuid.validation';
import { UserDataLoader } from '../loaders/user.loader';
import { userDTOC } from 'dtoc/types';
@InputType()
class order_opts {
  @Field(() => [CreateOrder])
  products: CreateOrder[];
  @Field(() => String, { nullable: true })
  shipping: String;
  @Field(() => String, { nullable: true })
  code: String;
}
@InputType()
class order_id {
  @Field(() => String)
  id: String;
}
@Resolver(() => orderDTOC)
export class OrderResolver {
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
    private readonly orderService: OrderService,
    private readonly usersDataLoader: UserDataLoader,
    private readonly orderProductLoader: OrderProductDataLoader,
    private readonly orderOfferDataLoader: OrderOfferDataLoader,
    private readonly productsDataLoader: ProductsDataLoaderSELECT,
  ) {}
  @ResolveField('user', () => userDTOC)
  async user(@Parent() order: OrderDTO): Promise<UserDTO> {
    return this.usersDataLoader.load(order.user_id);
  }
  @ResolveField('products', () => ProductDTOC)
  async products(@Parent() order): Promise<ProductDTO> {
    let products = order.products.filter((x) => {
      return x.id && !x.offerId;
    });
    let offers = order.products.filter((x) => {
      return x.offerId;
    });

    let o = offers;
    let childs = o.map((x) => x.children?.map((x) => x.id));
    let data = await Promise.all([
      this.orderProductLoader.loadMany(products),
      this.orderOfferDataLoader.loadMany(offers),
      this.productsDataLoader.loadMany(childs),
    ]);
    let [x, y, z] = data;

    let dt = [];
    if (x?.length) {
      dt.push(...x);
    }
    if (y?.length) {
      if (z && z[0]) {
        y.forEach((x, i) => {
          y[i]['children'].forEach((x1, i2) => {
            if (x1) {
              y[i]['children'][i2].prod = z[0].find((x2) => {
                return x2.id == x1.id;
              });
            }
          });
        });
      }

      dt.push(...y);
    }

    return dt;
  }
  @ResolveField('prod', () => ProductDTOC)
  async prod(@Parent() order): Promise<ProductDTO> {
    return { id: 'hh', title: 'gg' };
  }
  @ResolveField('offers', () => ProductDTOC)
  async offers(@Parent() order): Promise<ProductDTO> {
    return this.orderOfferDataLoader.loadMany(order.products);
  }
  @Query(() => OrdersResponse)
  @UseGuards(new AuthGuard())
  async mineOrders(
    @Args('options') options: P_Options,
    @Context('req')
    { session: { userId } },
  ) /* : Promise<OrderDTO[]> */ {
    options['userId'] = userId;
    return await this.orderService.indexOrdersByUser(options);
  }

  @Query(() => OrdersResponse)
  @UseGuards(new AuthGuard())
  async userOrders(
    @Args('options') options: P_Options,
  ) /* : Promise<OrderDTO[]> */ {
    return await this.orderService.indexOrdersByUser(options);
  }

  @Query(() => OrdersResponse)
  @UseGuards(new AuthGuard(), new AdminGuard())
  async allOrders(
    @Args('options') options: P_Options,
  ) /* : Promise<OrderDTO[]> */ {
    return await this.orderService.getAllOrders(options);
  }

  @Mutation(() => SimpleResponse)
  @UseGuards(new AuthGuard(), new AdminGuard())
  async deleteOrder(
    @Args('id') id: String,
    @Context('req')
    { session: { userId } },
  ) {
    return await this.orderService.destroyUserOrder(id, userId);
  }

  @Mutation(() => SimpleResponse)
  @UseGuards(new AuthGuard(), new AdminGuard())
  async upStatus(
    @Args('id') id: String,
    @Args('status') status: String,
    @Args('reason', { nullable: true }) failedReason: String,
    @Args('prices', { type: () => [Float], nullable: true }) prices: number[],
    @Args('total', { nullable: true }) total: string,
    @Args('totalNoPromo', { nullable: true }) totalNoPromo: string,
    @Args('code', { nullable: true }) code: string,
    @Context('req')
    { session: { userId } },
  ) {
    total = parseFloat(total) as any;
    totalNoPromo = parseFloat(totalNoPromo) as any;
    return await this.orderService.upStatus(
      { id, status, failedReason, total, totalNoPromo, code },
      userId,
      prices,
    );
  }
  @Mutation(() => OrderResponse)
  @UseGuards(new AuthGuard())
  async createOrder(
    @Args('options') { products, shipping, code }: order_opts,
    @Context('req')
    { session: { userId } },
  ) {
    console.log(88);
    
    shipping = JSON.stringify(
      Object.assign({ userId }, JSON.parse(shipping as any)),
    );
    return await this.orderService.createOrder(
      products,
      userId,
      shipping,
      code,
    );
  }
}
