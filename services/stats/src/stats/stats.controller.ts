import { MessagePattern } from '@nestjs/microservices';
import { StatsService } from './stats.service';
import { Controller, HttpException } from '@nestjs/common';

@Controller('stats')
export class StatsController {
  constructor(private readonly stats: StatsService) {}

  @MessagePattern('get_stats')
  async index(data: any = undefined) {
    return await this.stats.get();
  }
  @MessagePattern('set_mark')
  async marks(data: any = undefined) {
    return await this.stats.setMark(data);
  }
  @MessagePattern('reset_marks')
  async resetMark(data: any = undefined) {
    return await this.stats.resetMark(data);
  }

  ////////////////////////////
  @MessagePattern('set_cat')
  async cats(data: any = undefined) {
    return await this.stats.setCat(data);
  }
  @MessagePattern('reset_cats')
  async resetCats(data: any = undefined) {
    return await this.stats.resetCat(data);
  }

  /////////////////////////////////////

  @MessagePattern('set_ship')
  async ships(data: any = undefined) {
    return await this.stats.setShips(data);
  }

  @MessagePattern('reset_ships')
  async resetShips(data: any = undefined) {
    return await this.stats.resetShips(data);
  }
  ///////////////////////////////////////

  @MessagePattern('set_promo')
  async promo(data: any = undefined) {
    return await this.stats.setPromo(data);
  }
  @MessagePattern('reset_promos')
  async resetPromos(data: any = undefined) {
    return await this.stats.resetPromos(data);
  }

  ///////////////////////////////////
  @MessagePattern('set_event')
  async event(data: any = undefined) {
    return await this.stats.setEvent(data);
  }
  @MessagePattern('reset_events')
  async resetEventss(data: any = undefined) {
    return await this.stats.resetEvents(data);
  }

  ///////////////////////////////////
  @MessagePattern('up_max_price')
  async upMaxPrice(data: any = undefined) {
    return await this.stats.upMaxPrice(data);
  }
  @MessagePattern('up_max_price_offer')
  async upMaxPriceOffer(data: any = undefined) {
    return await this.stats.upMaxPriceOffer(data);
  }
  @MessagePattern('find_promo')
  async findPromoCode(data: any = undefined) {
    return await this.stats.findPromoCode(data);
  }
  @MessagePattern('set_currency')
  async setCurrency(data: any = undefined) {
    return await this.stats.setCurrency(data);
  }
}
