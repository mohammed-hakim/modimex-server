import { ReviewsService } from './reviews.service';
export declare class ReviewsController {
    private readonly reviews;
    constructor(reviews: ReviewsService);
    index(data?: any): Promise<{
        review: any;
        success: any;
    }>;
    get_many(ids?: any): Promise<any[]>;
    get_revs(data?: any): Promise<{
        reviews: import("./review.entity").ReviewEntity[];
        more: boolean;
    }>;
    delete_review(id?: any): Promise<{
        success: any;
    }>;
}
