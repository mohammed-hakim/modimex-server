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
var ProductsDataLoader_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsDataLoaderSELECT = exports.ProductsDataLoader = void 0;
const common_1 = require("@nestjs/common");
const DataLoader = require("dataloader");
let ProductsDataLoader = ProductsDataLoader_1 = class ProductsDataLoader {
    constructor(dataLoader) {
        this.dataLoader = dataLoader;
    }
    static async create(productsServ) {
        const dataloader = new DataLoader(async (ids) => {
            let revs = await productsServ.fetchProductsByIds(ids);
            return ids.map((key) => {
                let dt = revs.find((entities) => {
                    let ids = entities.map((x) => {
                        return x.id;
                    });
                    return JSON.stringify(ids) == JSON.stringify(key);
                });
                return dt;
            });
        });
        return new ProductsDataLoader_1(dataloader);
    }
    async load(id) {
        return await this.dataLoader.load(id);
    }
    async loadMany(products) {
        return this.dataLoader.loadMany(products);
    }
};
ProductsDataLoader = ProductsDataLoader_1 = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [DataLoader])
], ProductsDataLoader);
exports.ProductsDataLoader = ProductsDataLoader;
let ProductsDataLoaderSELECT = class ProductsDataLoaderSELECT {
    constructor(dataLoader) {
        this.dataLoader = dataLoader;
    }
    static async create(productsServ) {
        const dataloader = new DataLoader(async (ids) => {
            let revs = await productsServ.fetchProductsByIds(ids, [
                'title',
                'id',
                'images',
                'blured_images',
            ]);
            return ids.map((key) => {
                let dt = revs.find((entities) => {
                    let ids = entities.map((x) => {
                        return x.id;
                    });
                    return JSON.stringify(ids) == JSON.stringify(key);
                });
                return dt;
            });
        });
        return new ProductsDataLoader(dataloader);
    }
    async load(id) {
        return await this.dataLoader.load(id);
    }
    async loadMany(products) {
        return this.dataLoader.loadMany(products);
    }
};
ProductsDataLoaderSELECT = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [DataLoader])
], ProductsDataLoaderSELECT);
exports.ProductsDataLoaderSELECT = ProductsDataLoaderSELECT;
//# sourceMappingURL=products.loader.js.map