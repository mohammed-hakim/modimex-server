import { ProductDTO } from '@commerce/shared';
export declare class StatisticsService {
    private client;
    get_statistics(x?: string): Promise<ProductDTO>;
    set_state(what: any, data: any): Promise<ProductDTO>;
    reset_state(what: any, data: any): Promise<ProductDTO>;
}
