"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsModule = void 0;
const statistics_resolver_1 = require("./statistics.resolver");
const common_1 = require("@nestjs/common");
const statistics_service_1 = require("./statistics.service");
let StatisticsModule = class StatisticsModule {
};
StatisticsModule = __decorate([
    common_1.Module({
        providers: [statistics_service_1.StatisticsService, statistics_resolver_1.StatisticsResolver],
        exports: [statistics_service_1.StatisticsService],
    })
], StatisticsModule);
exports.StatisticsModule = StatisticsModule;
//# sourceMappingURL=statistics.module.js.map