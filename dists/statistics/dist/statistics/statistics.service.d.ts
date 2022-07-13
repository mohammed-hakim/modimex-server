import { StatisticsEntity } from './statistics.entity';
import { Connection, Repository } from 'typeorm';
export declare class StatisticsService {
    private readonly statistics;
    connectionORM: Connection;
    private client;
    constructor(statistics: Repository<StatisticsEntity>);
    get(data?: any): Promise<StatisticsEntity>;
    getAll(data?: any): Promise<{
        statistics: StatisticsEntity[];
    }>;
    set({ products, quantity, price }: {
        products: any;
        quantity: any;
        price: any;
    }): Promise<void>;
}
