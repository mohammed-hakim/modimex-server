import { Injectable } from '@nestjs/common';
import { OfferDTO } from '@commerce/shared';
import DataLoader = require('dataloader'); // commonjs module

import { IDataLoader } from '../contracts/nest-dataloader';
import { OffersService } from '../offers/offers.service';

@Injectable()
export class OrderOfferDataLoader implements IDataLoader<string, OfferDTO> {
  constructor(private readonly dataLoader: DataLoader<any, any>) {}

  public static async create(
    offerService: OffersService,
  ): Promise<OrderOfferDataLoader> {
    const dataloader = new DataLoader<string, OfferDTO>(async (offers: any) => {
      const ids = offers.map((offer) => offer.offerId).flat();
      let fetchedOffers = (await offerService.fetchOffersByIds(ids)) as any;

      let pros = offers.map((offer) => {
        let off = offers.find((p) => p.id == offer.id);
        return {
          offer: fetchedOffers.find((entity) => entity.id == offer.offerId),
          quantity_ordered: off.quantity,
          color: off.color,
          size: off.size,
          children: off.children,
        };
      });

      return pros;
    });

    return new OrderOfferDataLoader(dataloader);
  }
  public async load(id: string) {
    return this.dataLoader.load(id);
  }
  public async loadMany(offers: any[]) {
    return this.dataLoader.loadMany(offers);
  }
}
