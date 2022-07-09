import { InjectRepository } from '@nestjs/typeorm';
import { ReviewEntity } from './review.entity';
import { Injectable } from '@nestjs/common';
import { Client, Transport, ClientProxy } from '@nestjs/microservices';
import { config, success } from '@commerce/shared';
const { DELETE_REVIEW, NEW_REVIEW } = success;
import { Repository } from 'typeorm';

@Injectable()
export class ReviewsService {
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
    @InjectRepository(ReviewEntity)
    private readonly review: Repository<ReviewEntity>,
  ) {}

  async addReview(data) {
    let review = await this.review.save(data);

    if (data.isOffer) {
      await this.client
        .emit('update_reviews_avg_offer', {
          id: review.productId,
          rate: review.rate,
        })
        .toPromise();
    } else {
      await this.client
        .emit('update_reviews_avg_product', {
          id: review.productId,
          rate: review.rate,
        })
        .toPromise();
    }

    return {
      review,
      success: NEW_REVIEW,
    };
  }
  async get(data = { limit: 5 } as any) {
    data.limit += 1;
    let limit = data.limit;
    delete data.limit;
    data.take = limit;
    data.order = { created_at: 'DESC' };
    let reviews = await this.review.find(data);

    let more = reviews.length == limit;
    more && (reviews = reviews.splice(0, reviews.length - 1));

    return { reviews, more };
  }
  async deleteAll(data = {}) {
    let reviews = await this.review.delete({});
    return { reviews };
  }
  async delete_review(id) {
    await this.review.delete({ id });
    return { success: DELETE_REVIEW };
  }
  async fetcheByProductsIds({ ids, limit, skip }) {
    let idsS = ids.join(',');

    let sk = `${skip ? `offset ${skip}` : ``}`;
    let lim = `limit ${limit || 5}`;
    let data = await this.review.query(
      `
      select p.*
      from reviews p
      where p."productId" = ANY ('{${idsS}}'::uuid[])
     
      order by p."created_at" DESC
      ${sk}
      ${lim}  `,
      [],
    );
    let reviews = [];
    ids.forEach((x1, i) => {
      let dt = [];
      data.find((x) => {
        if (x.productId == x1) {
          dt.push(x);
        }
      });
      reviews[i] = { productId: x1, data: dt };
    });

    return reviews;
  }
}
