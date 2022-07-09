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
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsResolver = void 0;
const types_1 = require("./../dtoc/types");
const microservices_1 = require("@nestjs/microservices");
const shared_1 = require("@commerce/shared");
const graphql_1 = require("@nestjs/graphql");
const statistics_service_1 = require("./statistics.service");
let StatisticsResolver = class StatisticsResolver {
    constructor(statisticsService) {
        this.statisticsService = statisticsService;
    }
    async getStatistics() {
        return await this.statisticsService.get_statistics();
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
], StatisticsResolver.prototype, "client", void 0);
__decorate([
    graphql_1.Query(() => types_1.statisticsResponse),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], StatisticsResolver.prototype, "getStatistics", null);
StatisticsResolver = __decorate([
    graphql_1.Resolver(() => types_1.statisticsResponse),
    __metadata("design:paramtypes", [statistics_service_1.StatisticsService])
], StatisticsResolver);
exports.StatisticsResolver = StatisticsResolver;
//# sourceMappingURL=statistics.resolver.js.map