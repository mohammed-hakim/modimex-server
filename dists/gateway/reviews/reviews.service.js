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
exports.ReviewsService = void 0;
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const shared_1 = require("@commerce/shared");
const redis_1 = require("../utils/redis");
let ReviewsService = class ReviewsService {
    async storeRedis(keyData, msg) {
        redis_1.redis.del(redis_1.redisReviewsKey);
        return new Promise((resolve, reject) => {
            let key = JSON.stringify(keyData) + msg;
            redis_1.redis.get(redis_1.redisReviewsKey, (err, data) => {
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
                        redis_1.redis.set(redis_1.redisReviewsKey, JSON.stringify(df), 'EX', 60 * 60 * 60 * 24 * 3);
                        return resolve(products);
                    }, (error) => reject(error));
                }
                resolve(products);
            });
        });
    }
    async add_review(data) {
        return new Promise((resolve, reject) => {
            this.client
                .send('add_review', data)
                .toPromise()
                .then((product) => {
                redis_1.redis.del(redis_1.redisReviewsKey);
                resolve(product);
            }, (error) => reject(error));
        });
    }
    async deleteReview(data) {
        return new Promise((resolve, reject) => {
            this.client
                .send('delete_review', data)
                .toPromise()
                .then((product) => {
                redis_1.redis.del(redis_1.redisReviewsKey);
                resolve(product);
            }, (error) => reject(error));
        });
    }
    async fetchReviewsByIds(ids, skip = 0, limit = 5) {
        return await this.storeRedis({
            ids,
            skip,
            limit,
        }, 'fetche_by_products_ids');
    }
    async getReviews({ skip = 5, limit = 5, productId }) {
        return await this.storeRedis({
            skip,
            limit,
            productId,
        }, 'get_reviews');
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
], ReviewsService.prototype, "client", void 0);
ReviewsService = __decorate([
    common_1.Injectable()
], ReviewsService);
exports.ReviewsService = ReviewsService;
//# sourceMappingURL=reviews.service.js.map