import { ReviewEntity } from './review.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';

@Module({
  providers: [ReviewsService],
  imports: [TypeOrmModule.forFeature([ReviewEntity])],

  controllers: [ReviewsController],
})
export class ReviewsModule {}
