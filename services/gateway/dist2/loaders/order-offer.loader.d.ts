import { OfferDTO } from '@commerce/shared';
import DataLoader = require('dataloader');
import { IDataLoader } from '../contracts/nest-dataloader';
import { OffersService } from '../offers/offers.service';
export declare class OrderOfferDataLoader implements IDataLoader<string, OfferDTO> {
    private readonly dataLoader;
    constructor(dataLoader: DataLoader<any, any>);
    static create(offerService: OffersService): Promise<OrderOfferDataLoader>;
    load(id: string): Promise<any>;
    loadMany(offers: any[]): Promise<any[]>;
}
