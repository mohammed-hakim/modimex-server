import { StatsEntity } from './stats.entity';
import { Repository } from 'typeorm';
export declare class StatsService {
    private readonly stats;
    private client;
    constructor(stats: Repository<StatsEntity>);
    get(): Promise<StatsEntity>;
    setCurrency({ name }: {
        name: any;
    }): Promise<{
        currency: any;
        success: {
            en: {
                title: any;
                sentence: string;
            };
            ar: {
                title: any;
                sentence: string;
            };
        };
    }>;
    setMark(mark: any): Promise<{
        mark: any;
        success: {
            en: {
                title: any;
                sentence: string;
            };
            ar: {
                title: any;
                sentence: string;
            };
        };
    }>;
    setCat(category: any): Promise<{
        category: any;
        success: {
            en: {
                title: any;
                sentence: string;
            };
            ar: {
                title: any;
                sentence: string;
            };
        };
    }>;
    setPromo(promo: any): Promise<{
        promo: any;
        success: {
            en: {
                title: any;
                sentence: string;
            };
            ar: {
                title: any;
                sentence: string;
            };
        };
    }>;
    setShips(shipping: any): Promise<{
        shipping: any;
        success: {
            en: {
                title: any;
                sentence: string;
            };
            ar: {
                title: any;
                sentence: string;
            };
        };
    }>;
    setEvent(event: any): Promise<{
        event: any;
        success: {
            en: {
                title: any;
                sentence: string;
            };
            ar: {
                title: any;
                sentence: string;
            };
        };
    }>;
    resetEvents(events: any): Promise<{
        success: {
            en: {
                title: any;
                sentence: string;
            };
            ar: {
                title: any;
                sentence: string;
            };
        };
    }>;
    resetCat(categories: any): Promise<{
        success: {
            en: {
                title: any;
                sentence: string;
            };
            ar: {
                title: any;
                sentence: string;
            };
        };
    }>;
    resetMark(marks: any): Promise<{
        success: {
            en: {
                title: any;
                sentence: string;
            };
            ar: {
                title: any;
                sentence: string;
            };
        };
    }>;
    resetPromos(promos?: any[]): Promise<{
        success: {
            en: {
                title: any;
                sentence: string;
            };
            ar: {
                title: any;
                sentence: string;
            };
        };
    }>;
    resetShips(shippings: any): Promise<{
        success: {
            en: {
                title: any;
                sentence: string;
            };
            ar: {
                title: any;
                sentence: string;
            };
        };
    }>;
    isJson(str: any): boolean;
    create_UUID(): string;
    findPromoCode(code: any): Promise<any>;
    upMaxPrice(price: any): Promise<{}>;
    upMaxPriceOffer(price: any): Promise<{}>;
}
