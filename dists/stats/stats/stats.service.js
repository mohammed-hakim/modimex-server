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
exports.StatsService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const stats_entity_1 = require("./stats.entity");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const microservices_1 = require("@nestjs/microservices");
const shared_1 = require("@commerce/shared");
const UP_STATS = (x, x2) => {
    let y = {
        en: { title: x, sentence: `${x} Updated Successfully` },
        ar: { title: x2, sentence: `بنجاح ${x2} نم تحديث` }
    };
    return y;
};
let StatsService = class StatsService {
    constructor(stats) {
        this.stats = stats;
    }
    async get() {
        let data = await this.stats.findOne();
        if (!data) {
            let x = await this.stats.save({});
            return x;
        }
        return data;
    }
    async setCurrency({ name }) {
        let products = await this.stats.query(`
      UPDATE stats 
      SET currency = '${name}'
      `, []);
        return {
            currency: name,
            success: UP_STATS('currency', 'العملة'),
        };
    }
    async setMark(mark) {
        mark = JSON.stringify(mark);
        let products = await this.stats.query(`
      UPDATE stats 
      SET marks = marks || '[${mark}]'::jsonb
      `, []);
        return {
            mark: JSON.parse(mark),
            success: UP_STATS('mark', 'العلامة'),
        };
    }
    async setCat(category) {
        category = JSON.stringify(category);
        let products = await this.stats.query(`
      UPDATE stats 
      SET categories = categories || '[${category}]'::jsonb
      `, []);
        return {
            category: JSON.parse(category),
            success: UP_STATS('category', 'الفئة'),
        };
    }
    async setPromo(promo) {
        if (this.isJson(promo.name)) {
            promo.name = JSON.parse(promo.name);
            promo = {
                code: promo.name.code,
                reduction: promo.name.reduction,
                price: promo.name.price,
                images: promo.images,
            };
        }
        promo = JSON.stringify(promo);
        let products = await this.stats.query(`
      UPDATE stats 
      SET promos = promos || '[${promo}]'::jsonb
      `, []);
        return {
            promo: JSON.parse(promo),
            success: UP_STATS('promo', 'التخفيض'),
        };
    }
    async setShips(shipping) {
        if (this.isJson(shipping.name)) {
            shipping.name = JSON.parse(shipping.name);
            shipping = {
                name: shipping.name.name,
                images: shipping.images,
                price: shipping.name.price,
                time: shipping.name.time,
                id: this.create_UUID(),
            };
        }
        shipping = JSON.stringify(shipping);
        let products = await this.stats.query(`
      UPDATE stats 
      SET shippings = shippings || '[${shipping}]'::jsonb
      `, []);
        return {
            shipping: JSON.parse(shipping),
            success: UP_STATS('shipping', 'الشحن'),
        };
    }
    async setEvent(event) {
        event.link = event.name;
        delete event.name;
        event = JSON.stringify(event);
        let products = await this.stats.query(`
      UPDATE stats 
      SET events = events || '[${event}]'::jsonb

      `, []);
        return {
            event: JSON.parse(event),
            success: UP_STATS('event', 'الحدث'),
        };
    }
    async resetEvents(events) {
        await this.stats.update({}, { events });
        return {
            success: UP_STATS('event', 'الحدث'),
        };
    }
    async resetCat(categories) {
        await this.stats.update({}, { categories });
        return {
            success: UP_STATS('category', 'الفئة'),
        };
    }
    async resetMark(marks) {
        this.stats.update({}, { marks });
        return {
            success: UP_STATS('mark', 'العلامة'),
        };
    }
    async resetPromos(promos = []) {
        this.stats.update({}, { promos });
        return {
            success: UP_STATS('promo', 'التخفيض'),
        };
    }
    async resetShips(shippings) {
        this.stats.update({}, { shippings });
        return {
            success: UP_STATS('shipping', 'الشحن'),
        };
    }
    isJson(str) {
        try {
            JSON.parse(str);
        }
        catch (e) {
            return false;
        }
        return true;
    }
    create_UUID() {
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = (dt + Math.random() * 16) % 16 | 0;
            dt = Math.floor(dt / 16);
            return (c == 'x' ? r : (r & 0x3) | 0x8).toString(16);
        });
        return uuid;
    }
    async findPromoCode(code) {
        let statss = await this.stats.findOne();
        let promos = statss.promos;
        let valid = null;
        promos.forEach((x, i) => {
            if (x.code == code) {
                promos = promos.filter((x, i2) => {
                    return i2 !== i;
                });
                this.resetPromos(promos);
                valid = x;
            }
        });
        return valid;
    }
    async upMaxPrice(price) {
        let prods = await this.client.send('getByPrice', price).toPromise();
        if (!prods) {
            let datos = await this.stats.query(`
      UPDATE stats
        SET max_price = $1 
        RETURNING *;
      `, [price]);
        }
        return {};
    }
    async upMaxPriceOffer(price) {
        let prods = await this.client.send('getOfferByPrice', price).toPromise();
        if (!prods) {
            let datos = await this.stats.query(`
      UPDATE stats
        SET max_price_offer = $1 
        RETURNING *;
      `, [price]);
        }
        return {};
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
], StatsService.prototype, "client", void 0);
StatsService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(stats_entity_1.StatsEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], StatsService);
exports.StatsService = StatsService;
//# sourceMappingURL=stats.service.js.map