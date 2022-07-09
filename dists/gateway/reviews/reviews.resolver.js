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
exports.ReviewResolver = void 0;
const reviews_service_1 = require("./reviews.service");
const types_1 = require("./../dtoc/types");
const microservices_1 = require("@nestjs/microservices");
const shared_1 = require("@commerce/shared");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../middlewares/auth.guard");
const user_loader_1 = require("../loaders/user.loader");
let ReviewResolver = class ReviewResolver {
    constructor(revServ, usersDataLoader) {
        this.revServ = revServ;
        this.usersDataLoader = usersDataLoader;
    }
    async user(review) {
        return await this.usersDataLoader.load(review.userId);
    }
    async addReview(data, { req: { session: { userId }, }, }) {
        data['userId'] = userId;
        let x = this.revServ.add_review(data);
        console.log({ x });
        return x;
    }
    async getReviews(options, id) {
        options['productId'] = id;
        let x = await this.revServ.getReviews(options);
        console.log({ x });
        return x;
    }
    async deleteReview(id) {
        return this.revServ.deleteReview(id);
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
], ReviewResolver.prototype, "client", void 0);
__decorate([
    graphql_1.ResolveField('user', () => types_1.userDTOC, { nullable: true }),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "user", null);
__decorate([
    graphql_1.Mutation(() => types_1.ReviewResponse),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('review')),
    __param(1, graphql_1.Context()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.Review, Object]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "addReview", null);
__decorate([
    graphql_1.Query(() => types_1.ReviewsResponse),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('options')),
    __param(1, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.P_Options,
        String]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "getReviews", null);
__decorate([
    graphql_1.Mutation(() => Boolean),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ReviewResolver.prototype, "deleteReview", null);
ReviewResolver = __decorate([
    graphql_1.Resolver(() => types_1.ReviewDTOC),
    __metadata("design:paramtypes", [reviews_service_1.ReviewsService,
        user_loader_1.UserDataLoader])
], ReviewResolver);
exports.ReviewResolver = ReviewResolver;
//# sourceMappingURL=reviews.resolver.js.map