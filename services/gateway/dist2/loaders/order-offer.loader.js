"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var OrderOfferDataLoader_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderOfferDataLoader = void 0;
const common_1 = require("@nestjs/common");
const DataLoader = require("dataloader");
let OrderOfferDataLoader = OrderOfferDataLoader_1 = class OrderOfferDataLoader {
    constructor(dataLoader) {
        this.dataLoader = dataLoader;
    }
    static async create(offerService) {
        const dataloader = new DataLoader(async (offers) => {
            const ids = offers.map((offer) => offer.offerId).flat();
            let fetchedOffers = (await offerService.fetchOffersByIds(ids));
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
        return new OrderOfferDataLoader_1(dataloader);
    }
    async load(id) {
        return this.dataLoader.load(id);
    }
    async loadMany(offers) {
        return this.dataLoader.loadMany(offers);
    }
};
OrderOfferDataLoader = OrderOfferDataLoader_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [DataLoader])
], OrderOfferDataLoader);
exports.OrderOfferDataLoader = OrderOfferDataLoader;
//# sourceMappingURL=order-offer.loader.js.map