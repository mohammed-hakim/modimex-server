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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const offer_service_1 = require("./offer.service");
let OfferController = class OfferController {
    constructor(offers) {
        this.offers = offers;
    }
    async index(data = undefined) {
        return this.offers.get(data);
    }
    async create(data = undefined) {
        return this.offers.addoffer(data);
    }
    async getByPrice2(data) {
        return await this.offers.getOfferByPrice(data);
    }
    addManyOffers(data) {
        return this.offers.addManyOffers(data);
    }
    async offer(data = undefined) {
        return this.offers.update(data);
    }
    async delete(data = undefined) {
        return this.offers.destroy(data);
    }
    async show(data = undefined) {
        return this.offers.show(data);
    }
    async search(data = undefined) {
        return this.offers.search(data);
    }
    uprev(data) {
        return this.offers.updateREV(data);
    }
    fet(data) {
        return this.offers.fetchOffersByIds(data);
    }
    upQty(data) {
        return this.offers.updateQty(data);
    }
    async handleOrderDeleted(offers) {
        this.offers.incrementoffersStock(offers);
    }
    async handleOrderCreated(offers) {
        this.offers.decrementoffersStock(offers);
    }
};
__decorate([
    microservices_1.MessagePattern('offers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "index", null);
__decorate([
    microservices_1.MessagePattern('create-offer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "create", null);
__decorate([
    microservices_1.MessagePattern('getOfferByPrice'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "getByPrice2", null);
__decorate([
    microservices_1.MessagePattern('add-offers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OfferController.prototype, "addManyOffers", null);
__decorate([
    microservices_1.MessagePattern('update-offer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "offer", null);
__decorate([
    microservices_1.MessagePattern('delete-offer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "delete", null);
__decorate([
    microservices_1.MessagePattern('show-offer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "show", null);
__decorate([
    microservices_1.MessagePattern('search-offer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "search", null);
__decorate([
    microservices_1.MessagePattern('update_reviews_avg_offer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OfferController.prototype, "uprev", null);
__decorate([
    microservices_1.MessagePattern('fetch-offers-by-ids'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OfferController.prototype, "fet", null);
__decorate([
    microservices_1.MessagePattern('update-offer-quantity'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], OfferController.prototype, "upQty", null);
__decorate([
    microservices_1.EventPattern('inc_offer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "handleOrderDeleted", null);
__decorate([
    microservices_1.EventPattern('dec_offer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OfferController.prototype, "handleOrderCreated", null);
OfferController = __decorate([
    common_1.Controller('offers'),
    __metadata("design:paramtypes", [offer_service_1.OfferService])
], OfferController);
exports.OfferController = OfferController;
//# sourceMappingURL=offer.controller.js.map