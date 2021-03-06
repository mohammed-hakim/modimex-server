"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductsModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const product_service_1 = require("./product.service");
const product_entity_1 = require("./product.entity");
const product_controller_1 = require("./product.controller");
const graphql_exception_filter_1 = require("./../filters/graphql-exception.filter");
const core_1 = require("@nestjs/core");
let ProductsModule = class ProductsModule {
};
ProductsModule = __decorate([
    common_1.Module({
        providers: [
            product_service_1.ProductService,
            {
                provide: core_1.APP_FILTER,
                useClass: graphql_exception_filter_1.GraphQLErrorFilter,
            },
        ],
        imports: [typeorm_1.TypeOrmModule.forFeature([product_entity_1.ProductEntity])],
        controllers: [product_controller_1.ProductController],
    })
], ProductsModule);
exports.ProductsModule = ProductsModule;
//# sourceMappingURL=products.module.js.map