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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderResolver = void 0;
const products_loader_1 = require("./../loaders/products.loader");
const order_offer_loader_1 = require("./../loaders/order-offer.loader");
const admin_guard_1 = require("./../middlewares/admin.guard");
const types_1 = require("./../dtoc/types");
const microservices_1 = require("@nestjs/microservices");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const shared_1 = require("@commerce/shared");
const auth_guard_1 = require("../middlewares/auth.guard");
const create_order_validation_1 = require("./create-order.validation");
const order_product_loader_1 = require("../loaders/order-product.loader");
const order_service_1 = require("./order.service");
const user_loader_1 = require("../loaders/user.loader");
const types_2 = require("../dtoc/types");
let order_opts = class order_opts {
};
__decorate([
    graphql_1.Field(() => [create_order_validation_1.CreateOrder]),
    __metadata("design:type", Array)
], order_opts.prototype, "products", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], order_opts.prototype, "shipping", void 0);
__decorate([
    graphql_1.Field(() => String, { nullable: true }),
    __metadata("design:type", String)
], order_opts.prototype, "code", void 0);
order_opts = __decorate([
    graphql_1.InputType()
], order_opts);
let order_id = class order_id {
};
__decorate([
    graphql_1.Field(() => String),
    __metadata("design:type", String)
], order_id.prototype, "id", void 0);
order_id = __decorate([
    graphql_1.InputType()
], order_id);
let OrderResolver = class OrderResolver {
    constructor(orderService, usersDataLoader, orderProductLoader, orderOfferDataLoader, productsDataLoader) {
        this.orderService = orderService;
        this.usersDataLoader = usersDataLoader;
        this.orderProductLoader = orderProductLoader;
        this.orderOfferDataLoader = orderOfferDataLoader;
        this.productsDataLoader = productsDataLoader;
    }
    async user(order) {
        return this.usersDataLoader.load(order.user_id);
    }
    async products(order) {
        let products = order.products.filter((x) => {
            return x.id && !x.offerId;
        });
        let offers = order.products.filter((x) => {
            return x.offerId;
        });
        let o = offers;
        let childs = o.map((x) => { var _a; return (_a = x.children) === null || _a === void 0 ? void 0 : _a.map((x) => x.id); });
        let data = await Promise.all([
            this.orderProductLoader.loadMany(products),
            this.orderOfferDataLoader.loadMany(offers),
            this.productsDataLoader.loadMany(childs),
        ]);
        let [x, y, z] = data;
        let dt = [];
        if (x === null || x === void 0 ? void 0 : x.length) {
            dt.push(...x);
        }
        if (y === null || y === void 0 ? void 0 : y.length) {
            if (z && z[0]) {
                y.forEach((x, i) => {
                    y[i]['children'].forEach((x1, i2) => {
                        if (x1) {
                            y[i]['children'][i2].prod = z[0].find((x2) => {
                                return x2.id == x1.id;
                            });
                        }
                    });
                });
            }
            dt.push(...y);
        }
        return dt;
    }
    async prod(order) {
        return { id: 'hh', title: 'gg' };
    }
    async offers(order) {
        return this.orderOfferDataLoader.loadMany(order.products);
    }
    async mineOrders(options, { session: { userId } }) {
        options['userId'] = userId;
        return await this.orderService.indexOrdersByUser(options);
    }
    async userOrders(options) {
        return await this.orderService.indexOrdersByUser(options);
    }
    async allOrders(options) {
        return await this.orderService.getAllOrders(options);
    }
    async deleteOrder(id, { session: { userId } }) {
        return await this.orderService.destroyUserOrder(id, userId);
    }
    async upStatus(id, status, failedReason, prices, total, totalNoPromo, code, { session: { userId } }) {
        total = parseFloat(total);
        totalNoPromo = parseFloat(totalNoPromo);
        return await this.orderService.upStatus({ id, status, failedReason, total, totalNoPromo, code }, userId, prices);
    }
    async createOrder({ products, shipping, code }, { session: { userId } }) {
        console.log(88);
        shipping = JSON.stringify(Object.assign({ userId }, JSON.parse(shipping)));
        return await this.orderService.createOrder(products, userId, shipping, code);
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
], OrderResolver.prototype, "client", void 0);
__decorate([
    graphql_1.ResolveField('user', () => types_2.userDTOC),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [typeof (_a = typeof shared_1.OrderDTO !== "undefined" && shared_1.OrderDTO) === "function" ? _a : Object]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "user", null);
__decorate([
    graphql_1.ResolveField('products', () => types_1.ProductDTOC),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "products", null);
__decorate([
    graphql_1.ResolveField('prod', () => types_1.ProductDTOC),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "prod", null);
__decorate([
    graphql_1.ResolveField('offers', () => types_1.ProductDTOC),
    __param(0, graphql_1.Parent()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "offers", null);
__decorate([
    graphql_1.Query(() => types_1.OrdersResponse),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('options')),
    __param(1, graphql_1.Context('req')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.P_Options, Object]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "mineOrders", null);
__decorate([
    graphql_1.Query(() => types_1.OrdersResponse),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('options')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.P_Options]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "userOrders", null);
__decorate([
    graphql_1.Query(() => types_1.OrdersResponse),
    common_1.UseGuards(new auth_guard_1.AuthGuard(), new admin_guard_1.AdminGuard()),
    __param(0, graphql_1.Args('options')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.P_Options]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "allOrders", null);
__decorate([
    graphql_1.Mutation(() => types_1.SimpleResponse),
    common_1.UseGuards(new auth_guard_1.AuthGuard(), new admin_guard_1.AdminGuard()),
    __param(0, graphql_1.Args('id')),
    __param(1, graphql_1.Context('req')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "deleteOrder", null);
__decorate([
    graphql_1.Mutation(() => types_1.SimpleResponse),
    common_1.UseGuards(new auth_guard_1.AuthGuard(), new admin_guard_1.AdminGuard()),
    __param(0, graphql_1.Args('id')),
    __param(1, graphql_1.Args('status')),
    __param(2, graphql_1.Args('reason', { nullable: true })),
    __param(3, graphql_1.Args('prices', { type: () => [graphql_1.Float], nullable: true })),
    __param(4, graphql_1.Args('total', { nullable: true })),
    __param(5, graphql_1.Args('totalNoPromo', { nullable: true })),
    __param(6, graphql_1.Args('code', { nullable: true })),
    __param(7, graphql_1.Context('req')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String,
        String,
        String, Array, String, String, String, Object]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "upStatus", null);
__decorate([
    graphql_1.Mutation(() => types_1.OrderResponse),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('options')),
    __param(1, graphql_1.Context('req')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [order_opts, Object]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "createOrder", null);
OrderResolver = __decorate([
    graphql_1.Resolver(() => types_1.orderDTOC),
    __metadata("design:paramtypes", [order_service_1.OrderService,
        user_loader_1.UserDataLoader,
        order_product_loader_1.OrderProductDataLoader,
        order_offer_loader_1.OrderOfferDataLoader,
        products_loader_1.ProductsDataLoaderSELECT])
], OrderResolver);
exports.OrderResolver = OrderResolver;
//# sourceMappingURL=order.resolver.js.map