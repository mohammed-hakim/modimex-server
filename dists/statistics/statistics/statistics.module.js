"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatisticsModule = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const statistics_entity_1 = require("./statistics.entity");
const statistics_service_1 = require("./statistics.service");
const stats_controller_1 = require("./stats.controller");
let StatisticsModule = class StatisticsModule {
};
StatisticsModule = __decorate([
    common_1.Module({
        providers: [statistics_service_1.StatisticsService],
        imports: [typeorm_1.TypeOrmModule.forFeature([statistics_entity_1.StatisticsEntity])],
        controllers: [stats_controller_1.StatisticsController],
    })
], StatisticsModule);
exports.StatisticsModule = StatisticsModule;
//# sourceMappingURL=statistics.module.js.map