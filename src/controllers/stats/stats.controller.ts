import { Controller, Get, UseGuards, HttpException, HttpStatus } from '@nestjs/common';
import { StatsService } from 'src/services/stats/stats.service';
import { CRMStatsResponseInterface } from 'src/common/interfaces/stats.interface';
import { AuthGuard } from 'src/common/guards/auth.guard';

@Controller('stats')
export class StatsController {
  constructor(private statsS: StatsService) {}

  @Get('crm')
  @UseGuards(AuthGuard)
  async getCRMStats(): Promise<CRMStatsResponseInterface> {
    try {
      return await this.statsS.getCRMStats();
    } catch (err) {
      console.error('err', err);
      throw new HttpException('could_not_fetch_stats', HttpStatus.BAD_GATEWAY);
    }
  }
}


