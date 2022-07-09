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
var OrderProductDataLoader_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderProductDataLoader = void 0;
const common_1 = require("@nestjs/common");
const DataLoader = require("dataloader");
let OrderProductDataLoader = OrderProductDataLoader_1 = class OrderProductDataLoader {
    constructor(dataLoader) {
        this.dataLoader = dataLoader;
    }
    static async create(productService) {
        const dataloader = new DataLoader(async (products) => {
            const ids = products.map((product) => product.id).flat();
            let fetchedProducts = await productService.fetchProductsByIds(ids);
            let pros = products.map((product) => {
                return {
                    product: fetchedProducts.find((entity) => entity.id == product.id),
                    quantity_ordered: products.find((p) => p.id == product.id).quantity,
                    color: products.find((p) => p.id == product.id).color,
                    size: products.find((p) => p.id == product.id).size,
                };
            });
            return pros;
        });
        return new OrderProductDataLoader_1(dataloader);
    }
    async load(id) {
        return this.dataLoader.load(id);
    }
    async loadMany(products) {
        return this.dataLoader.loadMany(products);
    }
};
OrderProductDataLoader = OrderProductDataLoader_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [DataLoader])
], OrderProductDataLoader);
exports.OrderProductDataLoader = OrderProductDataLoader;
//# sourceMappingURL=order-product.loader.js.map