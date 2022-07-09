import { Request, Response } from 'express';
export declare type MyContext = {
    req: Request & {
        session?: any;
    };
    res: Response;
    redis: any;
};
export declare type err = {
    field: string;
    message: string;
};
