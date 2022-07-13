import { EventsService } from './events.service';
export declare class EventsController {
    private readonly events;
    constructor(events: EventsService);
    index(data?: any): Promise<{
        event: any;
        success: {
            sentence: string;
            title: string;
        };
    }>;
    get(data?: any): Promise<{
        events: import("./events.entity").EventEntity[];
    }>;
    delete_event(id?: any): Promise<{
        success: {
            sentence: string;
            title: string;
        };
    }>;
}
