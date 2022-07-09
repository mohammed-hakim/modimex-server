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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OfferService = void 0;
const microservices_1 = require("@nestjs/microservices");
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const offer_entity_1 = require("./offer.entity");
const class_validator_1 = require("class-validator");
const typeorm_2 = require("@nestjs/typeorm");
const shared_1 = require("@commerce/shared");
const path_1 = __importDefault(require("path"));
const { PERMISSION, INVALID_ID, TITLE_EXISTS } = shared_1.errors;
const { DELETE_OFFER, DELETE_OFFER_EVER, UPDATE_OFFER, NEW_OFFER } = shared_1.success;
let packagePath = path_1.default.dirname(require.resolve("@commerce/shared"));
console.log({ h: shared_1.config.REDIS_HOST, packagePath, config: shared_1.config.REDIS_PASS2 });
let OfferService = class OfferService {
    constructor(Offers) {
        this.Offers = Offers;
    }
    async get(data) {
        let { skip, limit = 20, sortBy, marks, categories, min, max, id, ids, } = data;
        let arr = [limit + 1];
        if (sortBy && (sortBy === null || sortBy === void 0 ? void 0 : sortBy.includes('oldprice'))) {
            sortBy = sortBy.replace('oldprice', 'original_price');
        }
        let where = ``;
        if (true) {
            let mar = `${marks ? ` AND p."mark" = ANY ('{${marks}}'::text[])` : ''}`;
            let cat = `${categories ? ` AND p."category" = ANY ('{${categories}}'::text[])` : ''}`;
            let mi = `${min ? ` AND p."price" >${min}` : ''}`;
            let mx = `${max ? ` AND p."price" <${max}` : ''}`;
            let myid = `${id ? `AND p."user_id" = '${id}'` : ''}`;
            let pIds = `${ids && ids.length ? ` AND p."id" = ANY ('{${ids}}'::uuid[])` : ''}`;
            let hid = ` AND p."hide"  != TRUE `;
            where = ` where p."price" > 0 `;
            where += mar + cat + mi + mx + myid + pIds + hid;
        }
        let offers = await this.Offers.query(`
      select p.*
      from offers p
      ${where}
      ${!sortBy ? `order by p."created_at" DESC` : `order by p.${sortBy}`}
      ${skip ? `offset ${skip}` : ``} 
      limit $1
      `, arr);
        offers = await this.transf(offers);
        let valid = offers.length == limit + 1;
        valid && (offers = offers.splice(0, offers.length - 1));
        return { offers, more: valid };
    }
    async addManyOffers(data) {
        for (let i = 0; i < data.length; i++) {
            setTimeout(() => {
                this.store(data[i]);
            }, 5000 * i);
        }
    }
    async addoffer(data) {
        try {
            let offer = await this.Offers.save(data);
            data.products_ids.forEach((x) => {
                this.client
                    .emit('update-product-quantity', {
                    id: x,
                    op: '-',
                    quantity: data.quantity,
                })
                    .subscribe(() => { });
            });
            return {
                offer,
                success: NEW_OFFER,
            };
        }
        catch (error) {
            if (String(error.code) == '23505') {
                return {
                    errors: [TITLE_EXISTS],
                };
            }
        }
    }
    async search(data) {
        let { skip, limit = 20, search_words = '' } = data;
        let arry = search_words.trim().length ? search_words.trim().split(' ') : [];
        arry = arry.filter((x) => {
            return x != '';
        });
        let dv = [];
        arry.forEach((x, i) => {
            arry[i] = x + ':*';
            dv[i] = x.length > 2 ? x.slice(0, x.length - 2) + ':*' : x;
        });
        search_words = arry.join(' <-> ');
        let search_words2 = dv.join(' <-> ');
        search_words = arry.join(' <-> ');
        let arr = [limit + 1];
        let offers = await this.Offers.query(`
      select p.*
      from offers p

      ${search_words.length > 2
            ? `where ((p."document_with_weights" @@ to_tsquery('${search_words}') 
          OR features @> (ARRAY['${search_words}'])
          or  p."document_with_weights" @@ to_tsquery('${search_words2}'))
          and p."hide" = FALSE
          )`
            : ''}

      order by ${search_words.length > 2
            ? `ts_rank(document_with_weights, to_tsquery('${search_words}')) desc`
            : `p."created_at" DESC`}
      ${skip ? `offset ${skip}` : ''}
      limit $1
      `, arr);
        offers = await this.transf(offers);
        let valid = offers.length == limit + 1;
        valid && (offers = offers.splice(0, offers.length - 1));
        return { offers, more: valid };
    }
    async show({ id, select }) {
        if (!class_validator_1.isUUID(id, 4))
            throw new common_1.HttpException([INVALID_ID], 404);
        let offer = await this.Offers.query(`
    SELECT * from offers
    where id = '${id}' and hide != TRUE
    `);
        if (!offer.length)
            throw new common_1.HttpException([INVALID_ID], 404);
        offer = offer[0];
        offer = await this.transfS(offer);
        return { offer };
    }
    async update({ id, data, user_id }) {
        try {
            const offer = await this.Offers.findOne({ id });
            if (!offer)
                return { errors: [INVALID_ID] };
            if (offer.user_id === user_id) {
                let offer = await this.Offers.createQueryBuilder()
                    .update(offer_entity_1.OfferEntity)
                    .set(data)
                    .where('id = :id ', { id })
                    .returning('*')
                    .execute();
                let prod = await this.transfS(offer.raw[0]);
                if (data.price) {
                    await this.client.emit('up_max_price_offer', data.price).toPromise();
                }
                return {
                    offer: prod,
                    success: UPDATE_OFFER,
                };
            }
            else {
                return { errors: [PERMISSION] };
            }
        }
        catch (e) {
            if (String(e.code) == '23505') {
                let errors = [TITLE_EXISTS];
                throw new common_1.HttpException(errors, 404);
            }
        }
    }
    async getOfferByPrice(price) {
        let products = await this.Offers.query(`

      select p.*
      from offers p
      where p."price" > ${parseFloat(price)}
      and  p."hide" = FALSE
     
      `, []);
        let x = products.length ? true : false;
        return x;
    }
    async fetchOffersByIds(ids) {
        if (ids[0] instanceof Array) {
            let arr = [];
            ids.forEach((x) => {
                arr.push(...x);
            });
            let Offers = await this.Offers.createQueryBuilder('offers')
                .where(`offers.id IN (:...ids)`, { ids: arr })
                .andWhere(`offers.hide = FALSE`)
                .getMany();
            ids.forEach((x, i) => {
                x.forEach((_, j) => {
                    Offers.forEach((prod) => {
                        if (prod.id == ids[i][j]) {
                            ids[i][j] = this.transfS(prod);
                        }
                    });
                });
            });
            return ids;
        }
        else {
            let offers = await this.Offers.createQueryBuilder('offers')
                .where(`offers.id IN (:...ids)`, { ids })
                .andWhere(`offers.hide = FALSE`)
                .select([
                'offers.id',
                'offers.title',
                'offers.price',
                'offers.quantity',
                'offers.mark',
                'offers.category',
                'offers.images',
                'offers.blured_images',
            ])
                .getMany();
            offers = await this.transf(offers);
            return offers;
        }
    }
    async store(data) {
        try {
            let offer = await this.Offers.save(data);
            await this.client.emit('up_max_price_offer', data.price).toPromise();
            return { offer };
        }
        catch (e) {
            if (String(e.code) == '23505') {
                let errors = [TITLE_EXISTS];
                throw new common_1.HttpException(errors, 404);
            }
        }
    }
    async updateREV({ id, rate }) {
        try {
            let offer1 = await this.Offers.findOne({ id });
            if (!offer1)
                throw new common_1.HttpException([INVALID_ID], 404);
            rate = parseInt(rate);
            let conc = ` || CONCAT('{"${rate}":', COALESCE(reviewsavg->>'${rate}','0')::int + 1, '}')::jsonb`;
            let offer = await this.Offers.query(`
        UPDATE offers 
    
        SET reviewsavg = reviewsavg ${conc}
        where offers.id = $1
        RETURNING *
        `, [id]);
            let prod = await this.transfS(offer[0][0]);
            return {
                offer: prod,
            };
        }
        catch (e) {
            if (String(e.code) == '23505') {
                let errors = [TITLE_EXISTS];
                throw new common_1.HttpException(errors, 404);
            }
        }
    }
    async destroy({ id, user_id }) {
        const offer = await this.Offers.findOne({ id });
        if (!offer)
            return { errors: [INVALID_ID] };
        if (offer.user_id === user_id) {
            this.update({ id, data: { hide: true, quantity: 0 }, user_id });
            offer.products_ids.forEach((x) => {
                this.client
                    .emit('update-product-quantity', {
                    id: x,
                    op: '+',
                    quantity: offer.quantity,
                })
                    .subscribe(() => { });
            });
            return {
                success: DELETE_OFFER,
            };
        }
        return { errors: [PERMISSION] };
    }
    async destroyEver({ id, user_id }) {
        const offer = await this.Offers.findOne({ id });
        if (!offer)
            return { errors: [INVALID_ID] };
        if (offer.user_id === user_id) {
            await this.Offers.delete({ id });
            return {
                success: DELETE_OFFER_EVER,
            };
        }
        return { errors: [PERMISSION] };
    }
    async transf(data) {
        for (let index = 0; index < data.length; index++) {
            await this.transfS(data[index]);
        }
        return data;
    }
    async transfS(data) {
        let img = data === null || data === void 0 ? void 0 : data.images;
        if (img && typeof img == 'string') {
            let imgsT = img.slice(2, img.length - 2);
            let imgsS = imgsT.split('","');
            data.images = imgsS;
        }
        let img2 = data === null || data === void 0 ? void 0 : data.blured_images;
        if (img2 && typeof img2 == 'string') {
            let imgsT2 = img2.slice(2, img2.length - 2);
            let imgsS2 = imgsT2.split('","');
            data.blured_images = imgsS2;
        }
        let products_ids = data === null || data === void 0 ? void 0 : data.products_ids;
        if (products_ids && typeof products_ids == 'string') {
            let products_idsS = products_ids.slice(2, products_ids.length - 2);
            let products_idsSP = products_idsS.split('","');
            data.products_ids = products_idsSP;
        }
        return data;
    }
    async updateQty({ id, op, quantity }) {
        try {
            let product1 = await this.Offers.findOne({ id });
            if (!product1)
                throw new common_1.HttpException([INVALID_ID], 404);
            quantity = parseInt(quantity);
            let conc = ` COALESCE(quantity,0)::int ${op} ${quantity}`;
            let product = await this.Offers.query(`
        UPDATE offers 
        SET quantity = ${conc}
        where offers.id = '${id}';`, []);
            let prod = await this.transfS(product.raw[0]);
            return {
                offer: prod,
            };
        }
        catch (e) {
            if (String(e.code) == '23505') {
                let errors = [TITLE_EXISTS];
                throw new common_1.HttpException(errors, 404);
            }
        }
    }
    async decrementoffersStock({ offers, property = 'quantity' }) {
        offers.forEach((offer) => {
            this.Offers.decrement({ id: offer.id }, property, offer.quantity);
        });
    }
    async incrementoffersStock({ offers, property = 'quantity' }) {
        offers.forEach((offer) => {
            this.Offers.increment({ id: offer.id }, property, offer.quantity);
        });
    }
    async create_idx() {
        let product = await this.Offers.query(`


          CREATE FUNCTION offers_tsvector_trigger() RETURNS trigger AS $$
          begin
            new.document_with_weights :=
            setweight(to_tsvector('english', coalesce(new.title, '')), 'A')
            || setweight(to_tsvector('english', coalesce(new.mark, '')), 'B')
            || setweight(to_tsvector('english', coalesce(new.category, '')), 'C')
            || setweight(to_tsvector('english', coalesce(new.description, '')), 'D');
            return new;
          end
          $$ LANGUAGE plpgsql;
          
          CREATE TRIGGER tsvectorupdate BEFORE INSERT OR UPDATE
              ON offers FOR EACH ROW EXECUTE PROCEDURE offers_tsvector_trigger();
      
          update offers
          set document_with_idx = to_tsvector(title ||' ' || mark || ' ' || category || ' ' || description ),
          document_with_weights = setweight(to_tsvector(title), 'A') ||
          setweight(to_tsvector(mark), 'B') ||
          setweight(to_tsvector(category), 'c') ||
          setweight(to_tsvector(description), 'D') ;
          CREATE INDEX document_idx3
          ON offers
          USING GIN (document_with_idx);
        CREATE INDEX document_weights_idx3
          ON offers
          USING GIN (document_with_weights);
      `, []);
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
], OfferService.prototype, "client", void 0);
OfferService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(offer_entity_1.OfferEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], OfferService);
exports.OfferService = OfferService;
//# sourceMappingURL=offer.service.js.map