import { StatsService } from 'src/services/stats/stats.service';
import { CRMStatsResponseInterface } from 'src/common/interfaces/stats.interface';
export declare class StatsController {
    private statsS;
    constructor(statsS: StatsService);
    getCRMStats(): Promise<CRMStatsResponseInterface>;
}
