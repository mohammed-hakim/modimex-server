import { ReviewsDTO } from '@commerce/shared';
import DataLoader = require('dataloader');
import { IDataLoader } from '../contracts/nest-dataloader';
import { ReviewsService } from '../reviews/reviews.service';
export declare class ReviewsDataLoader implements IDataLoader<string, ReviewsDTO> {
    private readonly dataLoader;
    constructor(dataLoader: DataLoader<any, any>);
    static create(reviewsServ: ReviewsService): Promise<ReviewsDataLoader>;
    load(id: string): Promise<any>;
}
