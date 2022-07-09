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
exports.ReviewsService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const review_entity_1 = require("./review.entity");
const common_1 = require("@nestjs/common");
const microservices_1 = require("@nestjs/microservices");
const shared_1 = require("@commerce/shared");
const { DELETE_REVIEW, NEW_REVIEW } = shared_1.success;
const typeorm_2 = require("typeorm");
let ReviewsService = class ReviewsService {
    constructor(review) {
        this.review = review;
    }
    async addReview(data) {
        let review = await this.review.save(data);
        if (data.isOffer) {
            await this.client
                .emit('update_reviews_avg_offer', {
                id: review.productId,
                rate: review.rate,
            })
                .toPromise();
        }
        else {
            await this.client
                .emit('update_reviews_avg_product', {
                id: review.productId,
                rate: review.rate,
            })
                .toPromise();
        }
        return {
            review,
            success: NEW_REVIEW,
        };
    }
    async get(data = { limit: 5 }) {
        data.limit += 1;
        let limit = data.limit;
        delete data.limit;
        data.take = limit;
        data.order = { created_at: 'DESC' };
        let reviews = await this.review.find(data);
        let more = reviews.length == limit;
        more && (reviews = reviews.splice(0, reviews.length - 1));
        return { reviews, more };
    }
    async deleteAll(data = {}) {
        let reviews = await this.review.delete({});
        return { reviews };
    }
    async delete_review(id) {
        await this.review.delete({ id });
        return { success: DELETE_REVIEW };
    }
    async fetcheByProductsIds({ ids, limit, skip }) {
        let idsS = ids.join(',');
        let sk = `${skip ? `offset ${skip}` : ``}`;
        let lim = `limit ${limit || 5}`;
        let data = await this.review.query(`
      select p.*
      from reviews p
      where p."productId" = ANY ('{${idsS}}'::uuid[])
     
      order by p."created_at" DESC
      ${sk}
      ${lim}  `, []);
        let reviews = [];
        ids.forEach((x1, i) => {
            let dt = [];
            data.find((x) => {
                if (x.productId == x1) {
                    dt.push(x);
                }
            });
            reviews[i] = { productId: x1, data: dt };
        });
        return reviews;
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
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(review_entity_1.ReviewEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ReviewsService);
exports.ReviewsService = ReviewsService;
//# sourceMappingURL=reviews.service.js.map