import { ProductsDataLoaderSELECT } from './../loaders/products.loader';
import { OrderOfferDataLoader } from './../loaders/order-offer.loader';
import { Module, Scope } from '@nestjs/common';

import { OrderResolver } from './order.resolver';
import { OrderService } from './order.service';
import { OrderProductDataLoader } from '../loaders/order-product.loader';
import { ProductService } from '../products/product.service';
import { ProductsModule } from '../products/products.module';
import { UserDataLoader } from '../loaders/user.loader';
import { UserService } from '../users/user.service';
import { UsersModule } from '../users/users.module';
import { OffersService } from '../offers/offers.service';
import { OffersModule } from 'offers/offers.module';
import { ProductsDataLoader } from '../loaders/products.loader';

@Module({
  providers: [
    OrderResolver,
    OrderService,
    {
      inject: [UserService],
      useFactory: UserDataLoader.create,
      provide: UserDataLoader,
      scope: Scope.REQUEST,
    },
    {
      inject: [ProductService],
      useFactory: OrderProductDataLoader.create,
      provide: OrderProductDataLoader,
      scope: Scope.REQUEST,
    },
    {
      inject: [OffersService],
      useFactory: OrderOfferDataLoader.create,
      provide: OrderOfferDataLoader,
      scope: Scope.REQUEST,
    },
    {
      inject: [ProductService],
      useFactory: ProductsDataLoaderSELECT.create,
      provide: ProductsDataLoaderSELECT,
      scope: Scope.REQUEST,
    },
  ],
  imports: [UsersModule, ProductsModule, OffersModule],
})
export class OrdersModule {}
