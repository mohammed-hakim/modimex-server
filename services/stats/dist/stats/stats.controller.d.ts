import { StatsService } from './stats.service';
export declare class StatsController {
    private readonly stats;
    constructor(stats: StatsService);
    index(data?: any): Promise<import("./stats.entity").StatsEntity>;
    marks(data?: any): Promise<{
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
    resetMark(data?: any): Promise<{
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
    cats(data?: any): Promise<{
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
    resetCats(data?: any): Promise<{
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
    ships(data?: any): Promise<{
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
    resetShips(data?: any): Promise<{
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
    promo(data?: any): Promise<{
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
    resetPromos(data?: any): Promise<{
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
    event(data?: any): Promise<{
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
    resetEventss(data?: any): Promise<{
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
    upMaxPrice(data?: any): Promise<{}>;
    upMaxPriceOffer(data?: any): Promise<{}>;
    findPromoCode(data?: any): Promise<any>;
    setCurrency(data?: any): Promise<{
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
}
