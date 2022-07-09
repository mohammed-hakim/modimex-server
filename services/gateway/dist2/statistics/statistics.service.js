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
exports.StatisticsService = void 0;
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const shared_1 = require("@commerce/shared");
let StatisticsService = class StatisticsService {
    async get_statistics(x = '') {
        return new Promise((resolve, reject) => {
            this.client
                .send('get_statistics', x)
                .toPromise()
                .then((product) => resolve(product), (error) => reject(error));
        });
    }
    async set_state(what, data) {
        return new Promise((resolve, reject) => {
            this.client
                .send(what, data)
                .toPromise()
                .then((product) => resolve(product), (error) => reject(error));
        });
    }
    async reset_state(what, data) {
        return new Promise((resolve, reject) => {
            this.client
                .send(what, data)
                .toPromise()
                .then((product) => resolve(product), (error) => reject(error));
        });
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
], StatisticsService.prototype, "client", void 0);
StatisticsService = __decorate([
    common_1.Injectable()
], StatisticsService);
exports.StatisticsService = StatisticsService;
//# sourceMappingURL=statistics.service.js.map