import { StatisticsService } from './statistics.service';
export declare class StatisticsResolver {
    private readonly statisticsService;
    private client;
    constructor(statisticsService: StatisticsService);
    getStatistics(): Promise<any>;
}
