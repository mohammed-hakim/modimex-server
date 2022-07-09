import { Injectable } from '@nestjs/common';
import { ReviewsDTO } from '@commerce/shared';
import DataLoader = require('dataloader');

import { IDataLoader } from '../contracts/nest-dataloader';
import { ReviewsService } from '../reviews/reviews.service';

@Injectable()
export class ReviewsDataLoader implements IDataLoader<string, ReviewsDTO> {
  constructor(private readonly dataLoader: DataLoader<any, any>) {}

  public static async create(
    reviewsServ: ReviewsService,
  ): Promise<ReviewsDataLoader> {
    const dataloader = new DataLoader<string, ReviewsDTO>(async (ids) => {
      let revs = (await reviewsServ.fetchReviewsByIds(ids as string[])) as any;

      return ids.map((key) => {
        let dt = revs.find((entity) => {
          return entity.productId == key;
        });

        return dt.data;
      });
    });
    return new ReviewsDataLoader(dataloader);
  }
  public async load(id: string) {
    return await this.dataLoader.load(id);
  }
}
