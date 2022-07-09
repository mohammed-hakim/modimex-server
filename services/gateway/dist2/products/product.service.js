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
exports.ProductService = void 0;
const redis_1 = require("./../utils/redis");
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const shared_1 = require("@commerce/shared");
const redis_2 = require("../utils/redis");
let ProductService = class ProductService {
    async addMany(data) {
        return new Promise((resolve, reject) => {
            this.client
                .send('add-products', data)
                .toPromise()
                .then((product) => resolve(product), (error) => reject(error));
        });
    }
    async get_mine(data) {
        return new Promise((resolve, reject) => {
            this.client
                .send('mine-products', data)
                .toPromise()
                .then((product) => resolve(product), (error) => reject(error));
        });
    }
    async storeRedis(keyData, msg) {
        return new Promise((resolve, reject) => {
            let key = JSON.stringify(keyData) + msg;
            redis_2.redis.get(redis_2.redisProductsKey, (err, data) => {
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
                        redis_2.redis.set(redis_2.redisProductsKey, JSON.stringify(df), 'EX', 60 * 60 * 60 * 24 * 3);
                        return resolve(products);
                    }, (error) => reject(error));
                }
                resolve(products);
            });
        });
    }
    async show(data) {
        return await this.storeRedis(data, 'show-product');
    }
    async get(data) {
        return await this.storeRedis(data, 'products');
    }
    async search(data) {
        return await this.storeRedis(data, 'search');
    }
    store(data, id) {
        return new Promise((resolve, reject) => {
            this.client
                .send('create-product', Object.assign(Object.assign({}, data), { user_id: id }))
                .toPromise()
                .then(async (product) => {
                redis_2.redis.del(redis_2.redisProductsKey);
                return resolve(product);
            }, (error) => reject(error));
        });
    }
    update(data, productId, id) {
        return new Promise((resolve, reject) => {
            this.client
                .send('update-product', Object.assign(Object.assign({}, data), { id: productId, user_id: id }))
                .toPromise()
                .then(async (product) => {
                redis_2.redis.del(redis_2.redisProductsKey);
                redis_2.redis.del(redis_1.redisStatsKey);
                return resolve(product);
            }, (error) => reject(error));
        });
    }
    async fetchProductsByIds(ids, select = null) {
        return (await this.storeRedis({ ids, select }, 'fetch-products-by-ids'));
    }
    async fetchProductsByIdsSELECT(ids, select) {
        return (await this.storeRedis({ ids, select }, 'fetch-products-by-ids-select'));
    }
    destroy(productId, id) {
        return new Promise((resolve, reject) => {
            this.client
                .send('find-order-by-productId', productId)
                .toPromise()
                .then((there_is) => {
                if (there_is) {
                    resolve(there_is);
                }
                else {
                    this.client
                        .send('delete-product', {
                        id: productId,
                        user_id: id,
                    })
                        .toPromise()
                        .then(async (product) => {
                        redis_2.redis.del(redis_2.redisProductsKey);
                        return resolve(product);
                    }, (error) => reject(error));
                }
            }, (error) => reject(error));
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
], ProductService.prototype, "client", void 0);
ProductService = __decorate([
    common_1.Injectable()
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map