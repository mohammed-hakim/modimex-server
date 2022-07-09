import { ProductsDataLoader } from './../loaders/products.loader';
import { Offer } from './../dtoc/types';
import { ReviewsDataLoader } from '../loaders/reviews.loader';
import { P_Options } from '../dtoc/types';
import { MyContext } from '../users/types';
import { FileUpload } from 'graphql-upload';
import { UserDataLoader } from '../loaders/user.loader';
import { OffersService } from './offers.service';
export declare class OfferResolver {
    private readonly OfferService;
    private readonly usersDataLoader;
    private readonly revsDataLoader;
    private readonly ProdsDataLoader;
    private client;
    constructor(OfferService: OffersService, usersDataLoader: UserDataLoader, revsDataLoader: ReviewsDataLoader, ProdsDataLoader: ProductsDataLoader);
    products(offer: any): Promise<any>;
    reviews(offer: any): Promise<any>;
    getOffers(args: P_Options, { req: { session: { userId }, }, }: MyContext, info: any): Promise<unknown>;
    search_offers(args: P_Options): Promise<unknown>;
    showOffer(id: string, info: any): Promise<any>;
    addOffer({ req: { session: { userId }, }, }: MyContext, data: Offer, token: String, IMG: FileUpload[]): Promise<any>;
    updateOffer(data: Offer, { req }: MyContext, id: string): Promise<any>;
    deleteOffer({ req: { session: { userId }, }, }: any, id: string): Promise<unknown>;
}
