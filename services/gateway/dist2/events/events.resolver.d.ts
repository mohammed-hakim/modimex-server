import { EventsService } from './events.service';
import { Event } from './../dtoc/types';
import { MyContext } from './../users/types';
import { FileUpload } from 'graphql-upload';
export declare class EventResolver {
    private eventsServ;
    private client;
    constructor(eventsServ: EventsService);
    getEvents(): Promise<any>;
    addEvent({ req: { session: { userId }, }, }: MyContext, data: Event, token: String, IMGS: FileUpload[]): Promise<any>;
    deleteEvent(id: String): Promise<any>;
}
