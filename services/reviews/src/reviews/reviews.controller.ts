import { MessagePattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { ReviewsService } from './reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviews: ReviewsService) {}

  @MessagePattern('add_review')
  async index(data: any = undefined) {
    return await this.reviews.addReview(data);
  }
  @MessagePattern('fetche_by_products_ids')
  async get_many(ids: any = undefined) {
    return await this.reviews.fetcheByProductsIds(ids);
  }
  @MessagePattern('get_reviews')
  async get_revs(data: any = undefined) {
    return await this.reviews.get(data);
  }
  @MessagePattern('delete_review')
  async delete_review(id: any = undefined) {
    return await this.reviews.delete_review(id);
  }
}
