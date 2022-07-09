import { DTOSimpleArg } from './../dtoc/types';
import { FileUpload } from 'graphql-upload';
import { StatsService } from './stats.service';
export declare class StatsResolver {
    private readonly statsService;
    private client;
    constructor(statsService: StatsService);
    getStats(): Promise<any>;
    setState(what: string, name: string, token: string, IMG: FileUpload): Promise<any>;
    isJson(str: any): boolean;
    setStateNOIMG(what: string, name: string): Promise<any>;
    reSetState(what: string, arg: [DTOSimpleArg]): Promise<any>;
}
