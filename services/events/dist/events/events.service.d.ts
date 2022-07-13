import { EventEntity } from './events.entity';
import { Repository } from 'typeorm';
export declare class EventsService {
    private readonly event;
    constructor(event: Repository<EventEntity>);
    addevent(data: any): Promise<{
        event: any;
        success: {
            sentence: string;
            title: string;
        };
    }>;
    get(data?: {}): Promise<{
        events: EventEntity[];
    }>;
    deleteAll(data?: {}): Promise<{
        events: import("typeorm").DeleteResult;
    }>;
    delete_event(id: any): Promise<{
        success: {
            sentence: string;
            title: string;
        };
    }>;
}
