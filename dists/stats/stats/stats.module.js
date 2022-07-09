"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatsModule = void 0;
const stats_entity_1 = require("./stats.entity");
const stats_controller_1 = require("./stats.controller");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const stats_service_1 = require("./stats.service");
let StatsModule = class StatsModule {
};
StatsModule = __decorate([
    common_1.Module({
        providers: [stats_service_1.StatsService],
        imports: [typeorm_1.TypeOrmModule.forFeature([stats_entity_1.StatsEntity])],
        controllers: [stats_controller_1.StatsController],
    })
], StatsModule);
exports.StatsModule = StatsModule;
//# sourceMappingURL=stats.module.js.map