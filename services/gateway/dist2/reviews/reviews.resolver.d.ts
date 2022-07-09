import { ReviewsService } from './reviews.service';
import { Review, P_Options } from './../dtoc/types';
import { MyContext } from './../users/types';
import { UserDataLoader } from 'loaders/user.loader';
export declare class ReviewResolver {
    private revServ;
    private usersDataLoader;
    private client;
    constructor(revServ: ReviewsService, usersDataLoader: UserDataLoader);
    user(review: any): Promise<any>;
    addReview(data: Review, { req: { session: { userId }, }, }: MyContext): Promise<unknown>;
    getReviews(options: P_Options, id: String): Promise<unknown>;
    deleteReview(id: String): Promise<unknown>;
}
