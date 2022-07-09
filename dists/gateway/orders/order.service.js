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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderService = void 0;
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const shared_1 = require("@commerce/shared");
const redis_1 = require("../utils/redis");
let OrderService = class OrderService {
    async inc_dec_order(order, what = 'inc', property, prices = []) {
        let prods = [];
        let offs = [];
        let data = [];
        let price = 0;
        let quantity = 0;
        order.order.products.forEach((x, i) => {
            if (property == 'sells') {
                data.push({
                    id: x.id || x.offerId,
                    price: prices && prices[i],
                    quantity: x.quantity,
                    isOffer: x.offerId && true,
                });
                price += prices[i];
                quantity += x.quantity;
            }
            if (x.offerId) {
                offs.push({ id: x.offerId, quantity: x.quantity, price: x.price });
            }
            else {
                prods.push({ id: x.id, quantity: x.quantity, price: x.price });
            }
        });
        if (prods === null || prods === void 0 ? void 0 : prods.length) {
            await this.client
                .emit(what + '_product', { products: prods, property })
                .toPromise();
            redis_1.redis.del(redis_1.redisProductsKey);
        }
        if (offs === null || offs === void 0 ? void 0 : offs.length) {
            await this.client
                .emit(what + '_offer', { offers: offs, property })
                .toPromise();
            redis_1.redis.del(redis_1.redisOffersKey);
        }
        if (property == 'sells') {
            let ret = await this.client
                .emit('set_statistics', { products: data, price, quantity })
                .toPromise();
        }
        return order;
    }
    async storeRedis(keyData, msg) {
        console.log({ keyData, msg });
        return new Promise((resolve, reject) => {
            let key = JSON.stringify(keyData) + msg;
            redis_1.redis.get(redis_1.redisOrdersKey, (err, data) => {
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
                        redis_1.redis.set(redis_1.redisOrdersKey, JSON.stringify(df), 'EX', 60 * 60 * 60 * 24 * 3);
                        return resolve(products);
                    }, (error) => reject(error));
                }
                resolve(products);
            });
        });
    }
    async indexOrdersByUser(data) {
        return await this.storeRedis(data, 'index-orders');
    }
    async getAllOrders(data) {
        return await this.storeRedis(data, 'all-orders');
    }
    upStatus(_a, userId, prices) {
        var { total, totalNoPromo, code } = _a, data = __rest(_a, ["total", "totalNoPromo", "code"]);
        return new Promise((resolve, reject) => {
            this.client
                .send('order_charged', data)
                .toPromise()
                .then(async (order) => {
                redis_1.redis.del(redis_1.redisOrdersKey);
                if (data.status == 'succeeded') {
                    await this.inc_dec_order(order, 'inc', 'sells', prices);
                    await this.client
                        .emit('order_completed', {
                        total,
                        totalNoPromo,
                        products: order.order.products,
                        code,
                        userId,
                    })
                        .toPromise();
                    let g = await redis_1.redis.get(redis_1.redisUsersKey);
                    console.log({ g });
                    await redis_1.redis.del(redis_1.redisUsersKey);
                    g = await redis_1.redis.get(redis_1.redisUsersKey);
                    console.log({ g2: g });
                }
                else if (data.status == 'failed') {
                    await this.inc_dec_order(order, 'inc', 'quantity');
                }
                return resolve(order);
            });
        });
    }
    createOrder(all, userId, shipping, code) {
        return new Promise(async (resolve, reject) => {
            let products = all.filter((x) => {
                return x.id;
            });
            let offers = all.filter((x) => {
                return x.offerId;
            });
            let Tprods = products.map((product) => product.id);
            let Toffers = offers.map((product) => product.offerId);
            let arr = [];
            let dt = await Promise.all([
                Tprods.length &&
                    this.client
                        .send('fetch-products-by-ids', { ids: Tprods })
                        .toPromise(),
                Toffers.length &&
                    this.client.send('fetch-offers-by-ids', Toffers).toPromise(),
            ]);
            let [prods, offs] = dt;
            let errors = [];
            let prodsOffers = [];
            let fetchedProdsOffers = [];
            if (prods.length) {
                const filteredProducts = products.filter((product) => {
                    const p = prods.find((p) => p.id === product.id);
                    let val = p.quantity >= product.quantity;
                    if (!val) {
                        errors.push({
                            field: 'products',
                            title: p.title,
                            msg: `${p.title} is out of stock at the moment, try with lower the amount.`,
                        });
                    }
                    return val;
                });
                if (filteredProducts.length != products.length) {
                    return reject(errors);
                }
                prodsOffers.push(...products);
                fetchedProdsOffers.push(...prods);
            }
            if (offs.length) {
                const filteredOffers = offers.filter((product) => {
                    const p = offers.find((p) => p.offerId === product.offerId);
                    let val = p.quantity >= product.quantity;
                    if (!val) {
                        errors.push({
                            field: 'offers',
                            title: p.title,
                            msg: `${p.title} is out of stock at the moment, try with lower the amount.`,
                        });
                    }
                    return val;
                });
                if (filteredOffers.length != offers.length) {
                    return reject(errors);
                }
                prodsOffers.push(...offers);
                fetchedProdsOffers.push(...offs);
            }
            let x = await this.store(prodsOffers, userId, shipping, code, fetchedProdsOffers);
            redis_1.redis.del(redis_1.redisOrdersKey);
            resolve(x);
        });
    }
    async destroyUserOrder(order_id, user_id) {
        return new Promise((resolve, reject) => {
            this.client
                .send('destroy-order-by-id', {
                id: order_id,
                user_id,
            })
                .toPromise()
                .then(async (order) => {
                redis_1.redis.del(redis_1.redisOrdersKey);
                resolve(order);
            });
        });
    }
    store(products, user_id, shipping, code, fetchedProducts) {
        return new Promise((resolve, reject) => {
            const mappedProducts = fetchedProducts
                .map((product) => {
                let p = products.find((p) => (p.id || p.offerId) === product.id);
                if (p) {
                    return Object.assign(Object.assign({}, product), { ordered_quantity: p.quantity, color: p.color, size: p.size, offerId: p.offerId, children: p.children });
                }
                return product;
            })
                .filter((product) => !!product.ordered_quantity);
            this.client
                .send('create_order', {
                products: mappedProducts,
                user_id,
                shipping,
                code,
            })
                .toPromise()
                .then(async (order) => {
                let offs = products.filter((x) => {
                    return x.offerId;
                });
                offs = offs.map((x) => {
                    return Object.assign(Object.assign({}, x), { id: x.offerId });
                });
                let prods = products.filter((x) => {
                    return !x.offerId;
                });
                console.log({ prods, offs });
                await this.client.emit('dec_offer', { offers: offs }).toPromise();
                await this.client
                    .emit('update_user', {
                    id: user_id,
                    phone: JSON.parse(shipping).phone,
                    adress: JSON.parse(shipping).adress,
                })
                    .toPromise();
                this.client
                    .emit('dec_product', { products: prods })
                    .toPromise()
                    .then(() => resolve(order));
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
], OrderService.prototype, "client", void 0);
OrderService = __decorate([
    common_1.Injectable()
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map