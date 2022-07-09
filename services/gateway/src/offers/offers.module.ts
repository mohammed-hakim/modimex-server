import { ReviewsModule } from './../reviews/reviews.module';
import { UsersModule } from './../users/users.module';
import { ProductsModule } from './../products/products.module';
import { ProductsDataLoader } from './../loaders/products.loader';
import { Module, Scope } from '@nestjs/common';
import { ProductService } from '../products/product.service';
// import { OffersService } from '../../../offers/src/offers/offer.service';
import { OfferResolver } from './offers.resolver';
import { OffersService } from './offers.service';
import { ReviewsDataLoader } from '../loaders/reviews.loader';
import { UserDataLoader } from '../loaders/user.loader';
import { ReviewsService } from '../reviews/reviews.service';
import { UserService } from '../users/user.service';

@Module({
  providers: [
    OffersService,
    OfferResolver,
    {
      inject: [ProductService],
      useFactory: ProductsDataLoader.create,
      provide: ProductsDataLoader,
      scope: Scope.REQUEST,
    },
    {
      inject: [UserService],
      useFactory: UserDataLoader.create,
      provide: UserDataLoader,
      scope: Scope.REQUEST,
    },
    {
      inject: [ReviewsService],
      useFactory: ReviewsDataLoader.create,
      provide: ReviewsDataLoader,
      scope: Scope.REQUEST,
    },
  ],
  imports: [ProductsModule, UsersModule, ReviewsModule],
  exports: [OffersService],
})
export class OffersModule {}
