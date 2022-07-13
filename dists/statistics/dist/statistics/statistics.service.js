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
exports.StatisticsService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const statistics_entity_1 = require("./statistics.entity");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const microservices_1 = require("@nestjs/microservices");
const shared_1 = require("@commerce/shared");
let StatisticsService = class StatisticsService {
    constructor(statistics) {
        this.statistics = statistics;
    }
    async get(data = null) {
        let day = new Date().getDate();
        let month = new Date().getMonth();
        let year = new Date().getFullYear();
        let repo = await this.statistics.findOne({ where: { day, month, year } });
        return repo;
    }
    async getAll(data = null) {
        let statistics = await this.statistics.find();
        statistics.forEach((x, i) => {
            statistics[i] &&
                (statistics[i].sells_data = JSON.stringify(x.sells_data));
        });
        return { statistics };
    }
    async set({ products, quantity, price }) {
        let day = new Date().getDate();
        let month = new Date().getMonth();
        let year = new Date().getFullYear();
        let repo = await this.get();
        if (repo) {
            quantity = parseInt(quantity);
            price = parseInt(price);
            let conc = ` COALESCE(sells_quantity,0)::int + ${quantity}`;
            let conc2 = ` COALESCE(sells_price,0)::int + ${price}`;
            let x = await this.statistics.query(`
        UPDATE statistics 
        SET sells_quantity   = ${conc},
            sells_price      = ${conc2},
            sells_data = sells_data || '${JSON.stringify({ products })}'::jsonb

        where statistics.day   = ${day} 
          AND statistics.month = ${month} 
          AND statistics.year  = ${year};`, []);
        }
        else {
            await this.statistics.save({
                month,
                year,
                day,
                sells_data: { products },
                sells_quantity: quantity,
                sells_price: price,
            });
        }
        return;
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
    __metadata("design:type", typeorm_2.Connection)
], StatisticsService.prototype, "connectionORM", void 0);
StatisticsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(statistics_entity_1.StatisticsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StatisticsService);
exports.StatisticsService = StatisticsService;
//# sourceMappingURL=statistics.service.js.map