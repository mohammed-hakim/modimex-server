import { ProductDTO } from '@commerce/shared';
export declare class StatsService {
    private client;
    storeRedis(keyData: any, msg: any): Promise<unknown>;
    get_stats(x?: string): Promise<ProductDTO>;
    set_state(what: any, data: any): Promise<ProductDTO>;
    reset_state(what: any, data: any): Promise<ProductDTO>;
}
