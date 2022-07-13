"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffersModule = void 0;
const reviews_module_1 = require("./../reviews/reviews.module");
const users_module_1 = require("./../users/users.module");
const products_module_1 = require("./../products/products.module");
const products_loader_1 = require("./../loaders/products.loader");
const common_1 = require("@nestjs/common");
const product_service_1 = require("../products/product.service");
const offers_resolver_1 = require("./offers.resolver");
const offers_service_1 = require("./offers.service");
const reviews_loader_1 = require("../loaders/reviews.loader");
const user_loader_1 = require("../loaders/user.loader");
const reviews_service_1 = require("../reviews/reviews.service");
const user_service_1 = require("../users/user.service");
let OffersModule = class OffersModule {
};
OffersModule = __decorate([
    common_1.Module({
        providers: [
            offers_service_1.OffersService,
            offers_resolver_1.OfferResolver,
            {
                inject: [product_service_1.ProductService],
                useFactory: products_loader_1.ProductsDataLoader.create,
                provide: products_loader_1.ProductsDataLoader,
                scope: common_1.Scope.REQUEST,
            },
            {
                inject: [user_service_1.UserService],
                useFactory: user_loader_1.UserDataLoader.create,
                provide: user_loader_1.UserDataLoader,
                scope: common_1.Scope.REQUEST,
            },
            {
                inject: [reviews_service_1.ReviewsService],
                useFactory: reviews_loader_1.ReviewsDataLoader.create,
                provide: reviews_loader_1.ReviewsDataLoader,
                scope: common_1.Scope.REQUEST,
            },
        ],
        imports: [products_module_1.ProductsModule, users_module_1.UsersModule, reviews_module_1.ReviewsModule],
        exports: [offers_service_1.OffersService],
    })
], OffersModule);
exports.OffersModule = OffersModule;
//# sourceMappingURL=offers.module.js.map