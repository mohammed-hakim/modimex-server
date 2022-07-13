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
exports.ReviewsController = void 0;
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const reviews_service_1 = require("./reviews.service");
let ReviewsController = class ReviewsController {
    constructor(reviews) {
        this.reviews = reviews;
    }
    async index(data = undefined) {
        return await this.reviews.addReview(data);
    }
    async get_many(ids = undefined) {
        return await this.reviews.fetcheByProductsIds(ids);
    }
    async get_revs(data = undefined) {
        return await this.reviews.get(data);
    }
    async delete_review(id = undefined) {
        return await this.reviews.delete_review(id);
    }
};
__decorate([
    microservices_1.MessagePattern('add_review'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "index", null);
__decorate([
    microservices_1.MessagePattern('fetche_by_products_ids'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "get_many", null);
__decorate([
    microservices_1.MessagePattern('get_reviews'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "get_revs", null);
__decorate([
    microservices_1.MessagePattern('delete_review'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewsController.prototype, "delete_review", null);
ReviewsController = __decorate([
    common_1.Controller('reviews'),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService])
], ReviewsController);
exports.ReviewsController = ReviewsController;
//# sourceMappingURL=reviews.controller.js.map