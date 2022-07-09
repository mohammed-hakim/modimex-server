import { ReviewsService } from './reviews.service';
import { Module, Scope } from '@nestjs/common';
import { ReviewResolver } from './reviews.resolver';
import { UserDataLoader } from 'loaders/user.loader';
import { UserService } from 'users/user.service';
import { UsersModule } from 'users/users.module';

@Module({
  providers: [
    ReviewsService,
    ReviewResolver,
    {
      inject: [UserService],
      useFactory: UserDataLoader.create,
      provide: UserDataLoader,
      scope: Scope.REQUEST,
    },
  ],
  imports: [UsersModule],
  exports: [ReviewsService],
})
export class ReviewsModule {}
