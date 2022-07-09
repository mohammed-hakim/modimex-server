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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResolver = void 0;
const reviews_loader_1 = require("./../loaders/reviews.loader");
const types_1 = require("./../dtoc/types");
const microservices_1 = require("@nestjs/microservices");
const shared_1 = require("@commerce/shared");
const graphql_1 = require("@nestjs/graphql");
const create_product_validation_1 = require("./create-product.validation");
const product_service_1 = require("./product.service");
const graphql_upload_1 = require("graphql-upload");
const user_loader_1 = require("../loaders/user.loader");
const useful_1 = require("../utils/useful");
let ProductResolver = class ProductResolver {
    constructor(productService, usersDataLoader, revsDataLoader) {
        this.productService = productService;
        this.usersDataLoader = usersDataLoader;
        this.revsDataLoader = revsDataLoader;
    }
    async user(product) {
        return await this.usersDataLoader.load(product.user_id);
    }
    async reviews(product) {
        let dt = await this.revsDataLoader.load(product.id);
        for (let i = 0; i < dt.length; i++) {
            const x = dt[i];
            x.user = await this.usersDataLoader.load(x.userId);
        }
        return dt;
    }
    async products(args, { req: { session: { userId }, }, }, info) {
        if (args.mine) {
            args['id'] = userId;
        }
        let x = (await this.productService.get(args));
        return x;
    }
    async fetchProductsByIds({ ids, ids2, select }, { req: { session: { userId }, }, }, info) {
        let products;
        if (ids2) {
            products = await this.productService.fetchProductsByIdsSELECT(ids2, select);
        }
        else {
            console.log(39, { ids, ids2 });
            products = await this.productService.fetchProductsByIds(ids, select);
        }
        return { products };
    }
    async search(args) {
        return await this.productService.search(args);
    }
    async mine_products(args, { req: { session: { userId }, }, }) {
        args['id'] = userId;
        let x = await this.productService.get_mine(args);
        return x;
    }
    async showProduct(id, info) {
        let select = await useful_1.searchFields({
            info,
            search: 'product',
            none: ['user', 'reviews'],
        });
        let d = await this.productService.show({ id, select });
        return d;
    }
    async createProduct({ req: { session: { userId }, }, }, data, token, IMG) {
        let paths = await useful_1.downAll(IMG, token);
        data['images'] = IMG.length
            ? paths[0]
            : ['http://localhost:2600/images/default.jpg'];
        data['blured_images'] = IMG.length
            ? paths[1]
            : ['http://localhost:2600/images/default.jpg'];
        let x = await this.productService.store(data, userId);
        return x;
    }
    async updateProduct(data, { req }, id) {
        console.log({ id }, 'upp');
        let x = await this.productService.update(data, id, req.session.userId);
        return x;
    }
    async deleteProduct({ req: { session: { userId }, }, }, id) {
        return this.productService.destroy(id, userId);
    }
};
__decorate([
    microservices_1.Client({
        transport: microservices_1.Transport.REDIS,
        options: {
            host: shared_1.config.REDIS_HOST,
            url: `redis://${shared_1.config.REDIS_HOST}:${shared_1.config.REDIS_PORTE}`,
            port: shared_1.config.REDIS_PORTE,
            password: shared_1.config.REDIS_PASS,
        },
    }),
    __metadata("design:type", microservices_1.ClientProxy)
], ProductResolver.prototype, "client", void 0);
__decorate([
    graphql_1.ResolveField('user', () => types_1.userDTOC, { nullable: true }),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.ProductDTO !== "undefined" && shared_1.ProductDTO) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "user", null);
__decorate([
    graphql_1.ResolveField('reviews', () => [String], { nullable: true }),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_b = typeof shared_1.ProductDTO !== "undefined" && shared_1.ProductDTO) === "function" ? _b : Object]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "reviews", null);
__decorate([
    graphql_1.Query(() => types_1.ProductsResponse),
    __param(0, graphql_1.Args('options', { nullable: true })),
    __param(1, graphql_1.Context()),
    __param(2, graphql_1.Info()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.P_Options, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "products", null);
__decorate([
    graphql_1.Query(() => types_1.ProductsResponse),
    __param(0, graphql_1.Args('options', { nullable: true })),
    __param(1, graphql_1.Context()),
    __param(2, graphql_1.Info()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.P_Options, Object, Object]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "fetchProductsByIds", null);
__decorate([
    graphql_1.Query(() => types_1.ProductsResponse),
    __param(0, graphql_1.Args('options', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.P_Options]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "search", null);
__decorate([
    graphql_1.Query(() => types_1.ProductsResponse),
    __param(0, graphql_1.Args('options', { nullable: true })),
    __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.P_Options, Object]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "mine_products", null);
__decorate([
    graphql_1.Query(() => types_1.ProductResponse),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Info()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "showProduct", null);
__decorate([
    graphql_1.Mutation(() => types_1.ProductResponse),
    __param(0, graphql_1.Context()),
    __param(1, graphql_1.Args('data', { nullable: true })),
    __param(2, graphql_1.Args('token', { nullable: true })),
    __param(3, graphql_1.Args({ name: 'images', type: () => [graphql_upload_1.GraphQLUpload], nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_product_validation_1.CreateProduct,
        String, Array]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "createProduct", null);
__decorate([
    graphql_1.Mutation(() => types_1.ProductResponse),
    __param(0, graphql_1.Args('data')),
    __param(1, graphql_1.Context()),
    __param(2, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_product_validation_1.UpdateProduct, Object, String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "updateProduct", null);
__decorate([
    graphql_1.Mutation(() => types_1.SimpleResponse),
    __param(0, graphql_1.Context()),
    __param(1, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "deleteProduct", null);
ProductResolver = __decorate([
    graphql_1.Resolver(() => types_1.ProductDTOC),
    __metadata("design:paramtypes", [product_service_1.ProductService,
        user_loader_1.UserDataLoader,
        reviews_loader_1.ReviewsDataLoader])
], ProductResolver);
exports.ProductResolver = ProductResolver;
//# sourceMappingURL=product.resolver.js.map