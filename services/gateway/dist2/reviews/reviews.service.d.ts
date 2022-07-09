export declare class ReviewsService {
    private client;
    storeRedis(keyData: any, msg: any): Promise<unknown>;
    add_review(data: any): Promise<unknown>;
    deleteReview(data: any): Promise<unknown>;
    fetchReviewsByIds(ids: any, skip?: number, limit?: number): Promise<unknown>;
    getReviews({ skip, limit, productId }: {
        skip?: number;
        limit?: number;
        productId: any;
    }): Promise<unknown>;
}
