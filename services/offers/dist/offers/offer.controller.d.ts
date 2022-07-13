import { OfferService } from './offer.service';
export declare class OfferController {
    private readonly offers;
    constructor(offers: OfferService);
    index(data?: any): Promise<{
        offers: any;
        more: boolean;
    }>;
    create(data?: any): Promise<{
        offer: any;
        success: any;
        errors?: undefined;
    } | {
        errors: any[];
        offer?: undefined;
        success?: undefined;
    }>;
    getByPrice2(data: any): Promise<boolean>;
    addManyOffers(data: any): Promise<void>;
    offer(data?: any): Promise<{
        errors: any[];
        offer?: undefined;
        success?: undefined;
    } | {
        offer: any;
        success: any;
        errors?: undefined;
    }>;
    delete(data?: any): Promise<{
        errors: any[];
        success?: undefined;
    } | {
        success: any;
        errors?: undefined;
    }>;
    show(data?: any): Promise<{
        offer: any;
    }>;
    search(data?: any): Promise<{
        offers: any;
        more: boolean;
    }>;
    uprev(data: any): Promise<{
        offer: any;
    }>;
    fet(data: any): Promise<any>;
    upQty(data: any): Promise<{
        offer: any;
    }>;
    handleOrderDeleted(offers: any): Promise<void>;
    handleOrderCreated(offers: any): Promise<void>;
}
