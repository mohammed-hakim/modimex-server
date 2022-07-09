import { Controller } from '@nestjs/common';
import { MessagePattern, EventPattern } from '@nestjs/microservices';
import { OfferService } from './offer.service';

@Controller('offers')
export class OfferController {
  constructor(private readonly offers: OfferService) {}

  @MessagePattern('offers')
  async index(data: any = undefined) /* : Promise<offerEntity[]> */ {
    return this.offers.get(data);
  }

  @MessagePattern('create-offer')
  async create(data: any = undefined) /* : Promise<offerEntity[]> */ {
    return this.offers.addoffer(data);
  }
  @MessagePattern('getOfferByPrice')
  async getByPrice2(data) /* : Promise<ProductEntity> */ {
    return await this.offers.getOfferByPrice(data);
  }

  @MessagePattern('add-offers')
  addManyOffers(data) /* : Promise<ProductEntity> */ {
    return this.offers.addManyOffers(data);
  }

  @MessagePattern('update-offer')
  async offer(data: any = undefined) /* : Promise<offerEntity[]> */ {
    return this.offers.update(data);
  }

  @MessagePattern('delete-offer')
  async delete(data: any = undefined) /* : Promise<offerEntity[]> */ {
    return this.offers.destroy(data);
  }

  @MessagePattern('show-offer')
  async show(data: any = undefined) /* : Promise<offerEntity[]> */ {
    return this.offers.show(data);
  }

  @MessagePattern('search-offer')
  async search(data: any = undefined) /* : Promise<offerEntity[]> */ {
    return this.offers.search(data);
  }
  @MessagePattern('update_reviews_avg_offer')
  uprev(data) /* : Promise<ProductEntity> */ {
    return this.offers.updateREV(data);
  }
  @MessagePattern('fetch-offers-by-ids')
  fet(data) /* : Promise<ProductEntity> */ {
    return this.offers.fetchOffersByIds(data);
  }

  @MessagePattern('update-offer-quantity')
  upQty(data) {
    return this.offers.updateQty(data);
  }

  @EventPattern('inc_offer')
  async handleOrderDeleted(offers) {
    this.offers.incrementoffersStock(offers);
  }
  @EventPattern('dec_offer')
  async handleOrderCreated(offers) {
    this.offers.decrementoffersStock(offers);
  }
}
