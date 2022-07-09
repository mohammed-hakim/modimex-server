"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const reviews_module_1 = require("./../reviews/reviews.module");
const reviews_loader_1 = require("./../loaders/reviews.loader");
const reviews_service_1 = require("./../reviews/reviews.service");
const common_1 = require("@nestjs/common");
const product_resolver_1 = require("./product.resolver");
const product_service_1 = require("./product.service");
const user_loader_1 = require("../loaders/user.loader");
const user_service_1 = require("../users/user.service");
const users_module_1 = require("../users/users.module");
let ProductsModule = class ProductsModule {
};
ProductsModule = __decorate([
    common_1.Module({
        providers: [
            product_resolver_1.ProductResolver,
            product_service_1.ProductService,
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
        imports: [users_module_1.UsersModule, reviews_module_1.ReviewsModule],
        exports: [product_service_1.ProductService],
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;
//# sourceMappingURL=products.module.js.map