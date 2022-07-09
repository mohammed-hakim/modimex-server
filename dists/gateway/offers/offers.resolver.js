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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferResolver = void 0;
const products_loader_1 = require("./../loaders/products.loader");
const types_1 = require("./../dtoc/types");
const reviews_loader_1 = require("../loaders/reviews.loader");
const types_2 = require("../dtoc/types");
const microservices_1 = require("@nestjs/microservices");
const shared_1 = require("@commerce/shared");
const graphql_1 = require("@nestjs/graphql");
const graphql_upload_1 = require("graphql-upload");
const user_loader_1 = require("../loaders/user.loader");
const useful_1 = require("../utils/useful");
const offers_service_1 = require("./offers.service");
let OfferResolver = class OfferResolver {
    constructor(OfferService, usersDataLoader, revsDataLoader, ProdsDataLoader) {
        this.OfferService = OfferService;
        this.usersDataLoader = usersDataLoader;
        this.revsDataLoader = revsDataLoader;
        this.ProdsDataLoader = ProdsDataLoader;
    }
    async products(offer) {
        return await this.ProdsDataLoader.load(offer.products_ids);
    }
    async reviews(offer) {
        let dt = await this.revsDataLoader.load(offer.id);
        for (let i = 0; i < dt.length; i++) {
            const x = dt[i];
            x.user = await this.usersDataLoader.load(x.userId);
        }
        return dt;
    }
    async getOffers(args, { req: { session: { userId }, }, }, info) {
        let select = await useful_1.searchFields({
            info,
            search: 'offers',
            none: ['user', 'reviews'],
        });
        if (args.mine) {
            args['id'] = userId;
        }
        args['select'] = select;
        return await this.OfferService.get(args);
    }
    async search_offers(args) {
        return await this.OfferService.search(args);
    }
    async showOffer(id, info) {
        let d = await this.OfferService.show({ id });
        return d;
    }
    async addOffer({ req: { session: { userId }, }, }, data, token, IMG) {
        let paths = await useful_1.downAll(IMG, token);
        data['user_id'] = userId;
        data['images'] = IMG.length
            ? paths[0]
            : ['http://localhost:2600/images/default.jpg'];
        data['blured_images'] = IMG.length
            ? paths[1]
            : ['http://localhost:2600/images/default.jpg'];
        let x = await this.OfferService.store(data);
        return x;
    }
    async updateOffer(data, { req }, id) {
        let x = await this.OfferService.update(data, id, req.session.userId);
        return x;
    }
    async deleteOffer({ req: { session: { userId }, }, }, id) {
        return this.OfferService.destroy(id, userId);
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
], OfferResolver.prototype, "client", void 0);
__decorate([
    graphql_1.ResolveField('products', () => types_2.userDTOC, { nullable: true }),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "products", null);
__decorate([
    graphql_1.ResolveField('reviews', () => [types_1.ReviewDTOC], { nullable: true }),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "reviews", null);
__decorate([
    graphql_1.Query(() => types_2.OffersResponse),
    __param(0, graphql_1.Args('options', { nullable: true })),
    __param(1, graphql_1.Context()),
    __param(2, graphql_1.Info()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_2.P_Options, Object, Object]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "getOffers", null);
__decorate([
    graphql_1.Query(() => types_2.OffersResponse),
    __param(0, graphql_1.Args('options', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_2.P_Options]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "search_offers", null);
__decorate([
    graphql_1.Query(() => types_2.OfferResponse),
    __param(0, graphql_1.Args('id')), __param(1, graphql_1.Info()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "showOffer", null);
__decorate([
    graphql_1.Mutation(() => types_2.OfferResponse),
    __param(0, graphql_1.Context()),
    __param(1, graphql_1.Args('data', { nullable: true })),
    __param(2, graphql_1.Args('token', { nullable: true })),
    __param(3, graphql_1.Args({ name: 'images', type: () => [graphql_upload_1.GraphQLUpload], nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, types_1.Offer,
        String, Array]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "addOffer", null);
__decorate([
    graphql_1.Mutation(() => types_2.OfferResponse),
    __param(0, graphql_1.Args('data')),
    __param(1, graphql_1.Context()),
    __param(2, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.Offer, Object, String]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "updateOffer", null);
__decorate([
    graphql_1.Mutation(() => types_2.SimpleResponse),
    __param(0, graphql_1.Context()),
    __param(1, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], OfferResolver.prototype, "deleteOffer", null);
OfferResolver = __decorate([
    graphql_1.Resolver(() => types_2.OfferDTOC),
    __metadata("design:paramtypes", [offers_service_1.OffersService,
        user_loader_1.UserDataLoader,
        reviews_loader_1.ReviewsDataLoader,
        products_loader_1.ProductsDataLoader])
], OfferResolver);
exports.OfferResolver = OfferResolver;
//# sourceMappingURL=offers.resolver.js.map