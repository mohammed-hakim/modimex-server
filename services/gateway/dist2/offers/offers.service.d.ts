export declare class OffersService {
    private client;
    storeRedis(keyData: any, msg: any): Promise<unknown>;
    get(data: any): Promise<unknown>;
    show(data: any): Promise<any>;
    fetchOffersByIds(ids: string[]): Promise<unknown>;
    addOffers(data: any): Promise<any>;
    search(data: any): Promise<unknown>;
    store(data: object): Promise<any>;
    update(data: any, offerId: string, id: string): Promise<any>;
    destroy(offerId: string, id: string): Promise<unknown>;
}
