import { Repository } from 'typeorm';
import { OfferEntity } from './offer.entity';
export declare class OfferService {
    private readonly Offers;
    private client;
    constructor(Offers: Repository<OfferEntity>);
    get(data: any): Promise<{
        offers: any;
        more: boolean;
    }>;
    addManyOffers(data: any): Promise<void>;
    addoffer(data: any): Promise<{
        offer: any;
        success: any;
        errors?: undefined;
    } | {
        errors: any[];
        offer?: undefined;
        success?: undefined;
    }>;
    search(data: any): Promise<{
        offers: any;
        more: boolean;
    }>;
    show({ id, select }: {
        id: any;
        select: any;
    }): Promise<{
        offer: any;
    }>;
    update({ id, data, user_id }: {
        id: any;
        data: any;
        user_id: any;
    }): Promise<{
        errors: any[];
        offer?: undefined;
        success?: undefined;
    } | {
        offer: any;
        success: any;
        errors?: undefined;
    }>;
    getOfferByPrice(price: any): Promise<boolean>;
    fetchOffersByIds(ids: any): Promise<any>;
    store(data: any): Promise<{
        offer: any;
    }>;
    updateREV({ id, rate }: {
        id: any;
        rate: any;
    }): Promise<{
        offer: any;
    }>;
    destroy({ id, user_id }: {
        id: any;
        user_id: any;
    }): Promise<{
        errors: any[];
        success?: undefined;
    } | {
        success: any;
        errors?: undefined;
    }>;
    destroyEver({ id, user_id }: {
        id: any;
        user_id: any;
    }): Promise<{
        errors: any[];
        success?: undefined;
    } | {
        success: any;
        errors?: undefined;
    }>;
    transf(data: any): Promise<any>;
    transfS(data: any): Promise<any>;
    updateQty({ id, op, quantity }: {
        id: any;
        op: any;
        quantity: any;
    }): Promise<{
        offer: any;
    }>;
    decrementoffersStock({ offers, property }: {
        offers: any;
        property?: string;
    }): Promise<void>;
    incrementoffersStock({ offers, property }: {
        offers: any;
        property?: string;
    }): Promise<void>;
    create_idx(): Promise<void>;
}
