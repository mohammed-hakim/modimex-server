// import { Redis } from 'ioredis';
import { Request, Response } from 'express';

export type MyContext = {
  req: Request & { session?: any };
  res: Response;
  redis: any; //Redis;
};
export type err = { field: string; message: string };
