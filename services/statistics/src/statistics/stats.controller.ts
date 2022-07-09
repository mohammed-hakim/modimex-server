import { MessagePattern } from '@nestjs/microservices';
import { StatisticsService } from './statistics.service';
import { Controller } from '@nestjs/common';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statistics: StatisticsService) {}

  @MessagePattern('get_statistics')
  async index(data: any = undefined) {
    return await this.statistics.getAll(data);
  }
  @MessagePattern('set_statistics')
  async sets(data: any = undefined) {
    return await this.statistics.set(data);
  }
}
