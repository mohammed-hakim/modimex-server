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
exports.StatsController = void 0;
const microservices_1 = require("@nestjs/microservices");
const stats_service_1 = require("./stats.service");
const common_1 = require("@nestjs/common");
let StatsController = class StatsController {
    constructor(stats) {
        this.stats = stats;
    }
    async index(data = undefined) {
        return await this.stats.get();
    }
    async marks(data = undefined) {
        return await this.stats.setMark(data);
    }
    async resetMark(data = undefined) {
        return await this.stats.resetMark(data);
    }
    async cats(data = undefined) {
        return await this.stats.setCat(data);
    }
    async resetCats(data = undefined) {
        return await this.stats.resetCat(data);
    }
    async ships(data = undefined) {
        return await this.stats.setShips(data);
    }
    async resetShips(data = undefined) {
        return await this.stats.resetShips(data);
    }
    async promo(data = undefined) {
        return await this.stats.setPromo(data);
    }
    async resetPromos(data = undefined) {
        return await this.stats.resetPromos(data);
    }
    async event(data = undefined) {
        return await this.stats.setEvent(data);
    }
    async resetEventss(data = undefined) {
        return await this.stats.resetEvents(data);
    }
    async upMaxPrice(data = undefined) {
        return await this.stats.upMaxPrice(data);
    }
    async upMaxPriceOffer(data = undefined) {
        return await this.stats.upMaxPriceOffer(data);
    }
    async findPromoCode(data = undefined) {
        return await this.stats.findPromoCode(data);
    }
    async setCurrency(data = undefined) {
        return await this.stats.setCurrency(data);
    }
};
__decorate([
    microservices_1.MessagePattern('get_stats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "index", null);
__decorate([
    microservices_1.MessagePattern('set_mark'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "marks", null);
__decorate([
    microservices_1.MessagePattern('reset_marks'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "resetMark", null);
__decorate([
    microservices_1.MessagePattern('set_cat'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "cats", null);
__decorate([
    microservices_1.MessagePattern('reset_cats'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "resetCats", null);
__decorate([
    microservices_1.MessagePattern('set_ship'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "ships", null);
__decorate([
    microservices_1.MessagePattern('reset_ships'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "resetShips", null);
__decorate([
    microservices_1.MessagePattern('set_promo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "promo", null);
__decorate([
    microservices_1.MessagePattern('reset_promos'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "resetPromos", null);
__decorate([
    microservices_1.MessagePattern('set_event'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "event", null);
__decorate([
    microservices_1.MessagePattern('reset_events'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "resetEventss", null);
__decorate([
    microservices_1.MessagePattern('up_max_price'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "upMaxPrice", null);
__decorate([
    microservices_1.MessagePattern('up_max_price_offer'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "upMaxPriceOffer", null);
__decorate([
    microservices_1.MessagePattern('find_promo'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "findPromoCode", null);
__decorate([
    microservices_1.MessagePattern('set_currency'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatsController.prototype, "setCurrency", null);
StatsController = __decorate([
    common_1.Controller('stats'),
    __metadata("design:paramtypes", [stats_service_1.StatsService])
], StatsController);
exports.StatsController = StatsController;
//# sourceMappingURL=stats.controller.js.map