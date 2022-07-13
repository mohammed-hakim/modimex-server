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
exports.OffersService = void 0;
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const shared_1 = require("@commerce/shared");
const redis_1 = require("../utils/redis");
let OffersService = class OffersService {
    async storeRedis(keyData, msg) {
        return new Promise((resolve, reject) => {
            let key = JSON.stringify(keyData) + msg;
            redis_1.redis.get(redis_1.redisOffersKey, (err, data) => {
                let products = null;
                if (data) {
                    products = JSON.parse(data)[key];
                }
                if (!products) {
                    return this.client
                        .send(msg, keyData)
                        .toPromise()
                        .then((products) => {
                        let df = Object.assign({}, JSON.parse(data));
                        df[key] = products;
                        redis_1.redis.set(redis_1.redisOffersKey, JSON.stringify(df), 'EX', 60 * 60 * 60 * 24 * 3);
                        return resolve(products);
                    }, (error) => reject(error));
                }
                resolve(products);
            });
        });
    }
    async get(data) {
        return await this.storeRedis(data, 'offers');
    }
    async show(data) {
        return await this.storeRedis(data, 'show-offer');
    }
    async fetchOffersByIds(ids) {
        return await this.storeRedis(ids, 'fetch-offers-by-ids');
    }
    async addOffers(data) {
        return await this.storeRedis(data, 'add-offers');
    }
    async search(data) {
        return await this.storeRedis(data, 'search-offer');
    }
    store(data) {
        return new Promise((resolve, reject) => {
            this.client
                .send('create-offer', Object.assign({}, data))
                .toPromise()
                .then((offer) => {
                redis_1.redis.del(redis_1.redisOffersKey);
                return resolve(offer);
            }, (error) => reject(error));
        });
    }
    update(data, offerId, id) {
        return new Promise((resolve, reject) => {
            this.client
                .send('update-offer', {
                data,
                id: offerId,
                user_id: id,
            })
                .toPromise()
                .then((offer) => {
                redis_1.redis.del(redis_1.redisOffersKey);
                return resolve(offer);
            }, (error) => reject(error));
        });
    }
    destroy(offerId, id) {
        return new Promise((resolve, reject) => {
            this.client
                .send('find-order-by-productId', offerId)
                .toPromise()
                .then((there_is) => {
                if (there_is) {
                    resolve(there_is);
                }
                else {
                    this.client
                        .send('delete-offer', {
                        id: offerId,
                        user_id: id,
                    })
                        .toPromise()
                        .then((offer) => {
                        redis_1.redis.del(redis_1.redisOffersKey);
                        return resolve(offer);
                    }, (error) => reject(error));
                }
            });
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
], OffersService.prototype, "client", void 0);
OffersService = __decorate([
    common_1.Injectable()
], OffersService);
exports.OffersService = OffersService;
//# sourceMappingURL=offers.service.js.map