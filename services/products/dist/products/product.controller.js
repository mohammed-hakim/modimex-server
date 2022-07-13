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
exports.ProductController = void 0;
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const product_service_1 = require("./product.service");
let ProductController = class ProductController {
    constructor(products) {
        this.products = products;
    }
    async index(data = undefined) {
        return this.products.get(data);
    }
    async search(data = undefined) {
        return this.products.search(data);
    }
    async store(data) {
        return await this.products.store(data);
    }
    async update(data) {
        let { id, user_id } = data;
        let dt = await this.products.update(id, data, user_id);
        return dt;
    }
    show(data) {
        return this.products.show(data);
    }
    addMany(data) {
        return this.products.addMany(data);
    }
    uprev(data) {
        return this.products.updateREV(data);
    }
    async getByPrice2(data) {
        return await this.products.getByPrice(data);
    }
    fetchProductsByIds({ ids, select = null }) {
        return this.products.fetchProductsByIds(ids, select);
    }
    fetchProductsByIds2(data) {
        return this.products.fetchProductsByIdsSELECT(data);
    }
    async handleOrderDeleted(products) {
        this.products.incrementProductsStock(products);
    }
    async handleOrderCreated(products) {
        this.products.decrementProductsStock(products);
    }
    destroy({ id, user_id }) {
        return this.products.destroy(id, user_id);
    }
    upQty(data) {
        return this.products.updateQty(data);
    }
};
__decorate([
    microservices_1.MessagePattern('products'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "index", null);
__decorate([
    microservices_1.MessagePattern('search'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "search", null);
__decorate([
    microservices_1.MessagePattern('create-product'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "store", null);
__decorate([
    microservices_1.MessagePattern('update-product'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    microservices_1.MessagePattern('show-product'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "show", null);
__decorate([
    microservices_1.MessagePattern('add-products'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "addMany", null);
__decorate([
    microservices_1.MessagePattern('update_reviews_avg_product'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "uprev", null);
__decorate([
    microservices_1.MessagePattern('getByPrice'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getByPrice2", null);
__decorate([
    microservices_1.MessagePattern('fetch-products-by-ids'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "fetchProductsByIds", null);
__decorate([
    microservices_1.MessagePattern('fetch-products-by-ids-select'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "fetchProductsByIds2", null);
__decorate([
    microservices_1.EventPattern('inc_product'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "handleOrderDeleted", null);
__decorate([
    microservices_1.EventPattern('dec_product'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "handleOrderCreated", null);
__decorate([
    microservices_1.MessagePattern('delete-product'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "destroy", null);
__decorate([
    microservices_1.MessagePattern('update-product-quantity'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProductController.prototype, "upQty", null);
ProductController = __decorate([
    common_1.Controller('products'),
    __metadata("design:paramtypes", [product_service_1.ProductService])
], ProductController);
exports.ProductController = ProductController;
//# sourceMappingURL=product.controller.js.map