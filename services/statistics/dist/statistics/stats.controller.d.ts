import { StatisticsService } from './statistics.service';
export declare class StatisticsController {
    private readonly statistics;
    constructor(statistics: StatisticsService);
    index(data?: any): Promise<{
        statistics: import("./statistics.entity").StatisticsEntity[];
    }>;
    sets(data?: any): Promise<void>;
}
