import { ReviewEntity } from './review.entity';
import { Repository } from 'typeorm';
export declare class ReviewsService {
    private readonly review;
    private client;
    constructor(review: Repository<ReviewEntity>);
    addReview(data: any): Promise<{
        review: any;
        success: any;
    }>;
    get(data?: any): Promise<{
        reviews: ReviewEntity[];
        more: boolean;
    }>;
    deleteAll(data?: {}): Promise<{
        reviews: import("typeorm").DeleteResult;
    }>;
    delete_review(id: any): Promise<{
        success: any;
    }>;
    fetcheByProductsIds({ ids, limit, skip }: {
        ids: any;
        limit: any;
        skip: any;
    }): Promise<any[]>;
}
