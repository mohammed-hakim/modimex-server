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
exports.StatisticsController = void 0;
const microservices_1 = require("@nestjs/microservices");
const statistics_service_1 = require("./statistics.service");
const common_1 = require("@nestjs/common");
let StatisticsController = class StatisticsController {
    constructor(statistics) {
        this.statistics = statistics;
    }
    async index(data = undefined) {
        return await this.statistics.getAll(data);
    }
    async sets(data = undefined) {
        return await this.statistics.set(data);
    }
};
__decorate([
    microservices_1.MessagePattern('get_statistics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "index", null);
__decorate([
    microservices_1.MessagePattern('set_statistics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], StatisticsController.prototype, "sets", null);
StatisticsController = __decorate([
    common_1.Controller('statistics'),
    __metadata("design:paramtypes", [statistics_service_1.StatisticsService])
], StatisticsController);
exports.StatisticsController = StatisticsController;
//# sourceMappingURL=stats.controller.js.map