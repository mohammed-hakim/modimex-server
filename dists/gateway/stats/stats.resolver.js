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
exports.StatsResolver = void 0;
const types_1 = require("./../dtoc/types");
let priceIMG = [
    'http://drive.google.com/uc?export=view&id=18idur8CXY92zvnR-esK3t6eLdCN7E2r9',
    'http://drive.google.com/uc?export=view&id=1Iu_xuc1xpeFMbuHxRNCUv1CquAWX4lx1',
];
let reductionIMG = [
    'http://drive.google.com/uc?export=view&id=122W7_CrIRZil0J4dnyF7i4DcXUICpNB6',
    'http://drive.google.com/uc?export=view&id=1krv8eQ-3HAGycIYBK5DWyW6bu9k8sVNH',
];
const microservices_1 = require("@nestjs/microservices");
const shared_1 = require("@commerce/shared");
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const auth_guard_1 = require("../middlewares/auth.guard");
const graphql_upload_1 = require("graphql-upload");
const stats_service_1 = require("./stats.service");
const useful_1 = require("../utils/useful");
let StatsResolver = class StatsResolver {
    constructor(statsService) {
        this.statsService = statsService;
    }
    async getStats() {
        return await this.statsService.get_stats();
    }
    async setState(what, name, token, IMG) {
        var _a, _b, _c, _d;
        if (IMG) {
            let x = await useful_1.downOne(IMG, token, true);
            return this.statsService.set_state(what, { name, images: x });
        }
        let x;
        if (this.isJson(name)) {
            if (((_a = JSON.parse(name)) === null || _a === void 0 ? void 0 : _a.code) && !(((_b = JSON.parse(name)) === null || _b === void 0 ? void 0 : _b.price) == 0)) {
                x = priceIMG;
            }
            else if (((_c = JSON.parse(name)) === null || _c === void 0 ? void 0 : _c.code) && ((_d = JSON.parse(name)) === null || _d === void 0 ? void 0 : _d.price) == 0) {
                x = reductionIMG;
            }
        }
        let ff = await this.statsService.set_state(what, { name, images: x });
        console.log({ ff });
        return ff;
    }
    isJson(str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    async setStateNOIMG(what, name) {
        let ff = this.statsService.set_state(what, { name });
        return ff;
    }
    async reSetState(what, arg) {
        if (!arg[0].name && !arg[0].images) {
            arg = [];
        }
        return this.statsService.reset_state(what, arg);
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
], StatsResolver.prototype, "client", void 0);
__decorate([
    graphql_1.Query(() => types_1.statsResponse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatsResolver.prototype, "getStats", null);
__decorate([
    graphql_1.Mutation(() => types_1.SimpleState),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('what')),
    __param(1, graphql_1.Args('name')),
    __param(2, graphql_1.Args('token')),
    __param(3, graphql_1.Args({ name: 'image', type: () => graphql_upload_1.GraphQLUpload, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Object]),
    __metadata("design:returntype", Promise)
], StatsResolver.prototype, "setState", null);
__decorate([
    graphql_1.Mutation(() => types_1.SimpleState),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('what')), __param(1, graphql_1.Args('name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], StatsResolver.prototype, "setStateNOIMG", null);
__decorate([
    graphql_1.Mutation(() => types_1.SimpleState),
    common_1.UseGuards(new auth_guard_1.AuthGuard()),
    __param(0, graphql_1.Args('what')),
    __param(1, graphql_1.Args({ name: 'arg', type: () => [types_1.DTOSimpleArg], nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Array]),
    __metadata("design:returntype", Promise)
], StatsResolver.prototype, "reSetState", null);
StatsResolver = __decorate([
    graphql_1.Resolver(() => types_1.statsResponse),
    __metadata("design:paramtypes", [stats_service_1.StatsService])
], StatsResolver);
exports.StatsResolver = StatsResolver;
//# sourceMappingURL=stats.resolver.js.map