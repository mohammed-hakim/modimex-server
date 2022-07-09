import { ProductDTO } from '@commerce/shared';
export declare class EventsService {
    private client;
    add_event(data: any): Promise<ProductDTO>;
    getEvents(data?: {}): Promise<ProductDTO>;
    deleteEvent(data: any): Promise<ProductDTO>;
}
