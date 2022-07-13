"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersModule = void 0;
const products_loader_1 = require("./../loaders/products.loader");
const order_offer_loader_1 = require("./../loaders/order-offer.loader");
const common_1 = require("@nestjs/common");
const order_resolver_1 = require("./order.resolver");
const order_service_1 = require("./order.service");
const order_product_loader_1 = require("../loaders/order-product.loader");
const product_service_1 = require("../products/product.service");
const products_module_1 = require("../products/products.module");
const user_loader_1 = require("../loaders/user.loader");
const user_service_1 = require("../users/user.service");
const users_module_1 = require("../users/users.module");
const offers_service_1 = require("../offers/offers.service");
const offers_module_1 = require("../offers/offers.module");
let OrdersModule = class OrdersModule {
};
OrdersModule = __decorate([
    common_1.Module({
        providers: [
            order_resolver_1.OrderResolver,
            order_service_1.OrderService,
            {
                inject: [user_service_1.UserService],
                useFactory: user_loader_1.UserDataLoader.create,
                provide: user_loader_1.UserDataLoader,
                scope: common_1.Scope.REQUEST,
            },
            {
                inject: [product_service_1.ProductService],
                useFactory: order_product_loader_1.OrderProductDataLoader.create,
                provide: order_product_loader_1.OrderProductDataLoader,
                scope: common_1.Scope.REQUEST,
            },
            {
                inject: [offers_service_1.OffersService],
                useFactory: order_offer_loader_1.OrderOfferDataLoader.create,
                provide: order_offer_loader_1.OrderOfferDataLoader,
                scope: common_1.Scope.REQUEST,
            },
            {
                inject: [product_service_1.ProductService],
                useFactory: products_loader_1.ProductsDataLoaderSELECT.create,
                provide: products_loader_1.ProductsDataLoaderSELECT,
                scope: common_1.Scope.REQUEST,
            },
        ],
        imports: [users_module_1.UsersModule, products_module_1.ProductsModule, offers_module_1.OffersModule],
    })
], OrdersModule);
exports.OrdersModule = OrdersModule;
//# sourceMappingURL=orders.module.js.map