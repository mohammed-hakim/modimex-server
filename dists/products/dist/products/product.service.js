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
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
const product_entity_1 = require("./product.entity");
const class_validator_1 = require("class-validator");
const typeorm_2 = require("@nestjs/typeorm");
const microservices_1 = require("@nestjs/microservices");
const shared_1 = require("@commerce/shared");
const { PERMISSION, INVALID_ID, TITLE_EXISTS } = shared_1.errors;
const { DELETE_PRODUCT, DELETE_PRODUCT_EVER, UPDATE_PRODUCT, NEW_PRODUCT, } = shared_1.success;
let ProductService = class ProductService {
    constructor(Prods) {
        this.Prods = Prods;
    }
    async get(data) {
        let { skip, limit = 20, sortBy, marks, categories, min, max, id, ids, notID, } = data;
        let arr = [limit + 1];
        let where = ``;
        if (true) {
            let mar = `${marks ? ` AND p."mark" = ANY ('{${marks}}'::text[])` : ''}`;
            let cat = `${categories ? ` AND p."category" = ANY ('{${categories}}'::text[])` : ''}`;
            if (notID) {
                mar = `${marks
                    ? ` AND (p."mark" = ANY ('{${marks}}'::text[]) OR p."category" = ANY ('{${categories}}'::text[]))`
                    : ''}`;
                cat = ``;
            }
            let mi = `${min ? ` AND p."price" >${min}` : ''}`;
            let mx = `${max ? ` AND p."price" <${max}` : ''}`;
            let myid = `${id ? `AND p."user_id" = '${id}'` : ''}`;
            let not = `${notID ? `AND NOT p."id" = '${notID}'` : ''}`;
            let pIds = `${ids && ids.length ? ` AND p."id" = ANY ('{${ids}}'::uuid[])` : ''}`;
            let hid = `AND p."hide" = FALSE `;
            where = ` where p."price" > 0 `;
            where += mar + cat + mi + mx + myid + pIds + not + hid;
        }
        let products = await this.Prods.query(`
      select p.*
      from products p
      ${where}
      ${!sortBy ? `order by p."created_at" DESC` : `order by p.${sortBy}`}
      ${skip ? `offset ${skip}` : ``} 
      limit $1
      `, arr);
        products = await this.transf(products);
        let valid = products.length == limit + 1;
        valid && (products = products.splice(0, products.length - 1));
        return { products, more: valid };
    }
    async getByPrice(price) {
        let products = await this.Prods.query(`

      select p.*
      from products p
      where p."price" > ${parseFloat(price)}  and p."hide" = FALSE

      `, []);
        let x = products.length ? true : false;
        return x;
    }
    async search(data) {
        let { skip, limit = 20, search_words = '' } = data;
        let arry = search_words.trim().split(' ');
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
        let arr = [limit + 1];
        let products = await this.Prods.query(`
   
      select p.*
      from products p
      ${search_words.length > 2
            ? `where 
             (( p."document_with_weights" @@ to_tsquery('${search_words}') 
             OR features @> (ARRAY['${search_words}']) 
             OR p."document_with_weights" @@ to_tsquery('${search_words2}'))
             and p."hide" = FALSE
             )`
            : ''}
     
      order by ${search_words.length > 2
            ? `ts_rank(document_with_weights, to_tsquery('${search_words}')) desc`
            : `p."created_at" DESC`}
      ${skip ? `offset ${skip}` : ''}
      limit $1
      `, arr);
        products = await this.transf(products);
        let valid = products.length == limit + 1;
        valid && (products = products.splice(0, products.length - 1));
        return { products, more: valid };
    }
    async deleteAll() {
        let d = this.Prods.delete({});
        return d;
    }
    async fetchProductsByIds(ids, select) {
        if (select) {
            select.map((x, i) => {
                select[i] = 'products.' + x;
            });
        }
        if (ids[0] instanceof Array) {
            let arr = [];
            ids.forEach((x) => {
                arr.push(...x);
            });
            let prods = null;
            if (select) {
                prods = await this.Prods.createQueryBuilder('products')
                    .where(`products.id IN (:...ids)`, { ids: arr })
                    .andWhere(`products.hide = FALSE`)
                    .select(select)
                    .getMany();
            }
            else {
                prods = await this.Prods.createQueryBuilder('products')
                    .where(`products.id IN (:...ids)`, { ids: arr })
                    .andWhere(`products.hide = FALSE`)
                    .getMany();
            }
            ids.forEach(async (x, i) => {
                x.forEach(async (_, j) => {
                    prods.forEach(async (prod) => {
                        if (prod.id == ids[i][j]) {
                            ids[i][j] = await this.transfS(prod);
                        }
                    });
                });
            });
            return ids;
        }
        else {
            let products = await this.Prods.createQueryBuilder('products')
                .where(`products.id IN (:...ids)`, { ids })
                .select(!select
                ? [
                    'products.id',
                    'products.title',
                    'products.price',
                    'products.quantity',
                    'products.mark',
                    'products.category',
                    'products.images',
                    'products.blured_images',
                ]
                : select)
                .getMany();
            products = this.transf(products);
            return products;
        }
    }
    async fetchProductsByIdsSELECT({ ids, select }) {
        if (ids[0] instanceof Array) {
            let arr = [];
            ids.forEach((x) => {
                arr.push(...x);
            });
            let prods = await this.Prods.createQueryBuilder('products')
                .where(`products.id IN (:...ids)  and p."hide" = FALSE`, { ids: arr })
                .getMany();
            ids.forEach((x, i) => {
                x.forEach((_, j) => {
                    prods.forEach((prod) => {
                        if (prod.id == ids[i][j]) {
                            ids[i][j] = this.transfS(prod);
                        }
                    });
                });
            });
            return ids;
        }
        else {
            let products = await this.Prods.createQueryBuilder('products')
                .where(`products.id IN (:...ids)`, { ids })
                .select([
                'products.id',
                'products.title',
                'products.price',
                'products.quantity',
                'products.mark',
                'products.category',
                'products.images',
                'products.blured_images',
            ])
                .getMany();
            products = this.transf(products);
            return products;
        }
    }
    async store(data) {
        try {
            let product = await this.Prods.save(data);
            await this.client.emit('up_max_price', data.price).toPromise();
            return {
                product,
                success: NEW_PRODUCT,
            };
        }
        catch (e) {
            if (String(e.code) == '23505') {
                let errors = [TITLE_EXISTS];
                throw new common_1.HttpException(errors, 404);
            }
        }
    }
    async addMany(data) {
        for (let i = 0; i < data.length; i++) {
            setTimeout(() => {
                this.store(data[i]);
            }, 500 * i);
        }
    }
    async updateREV({ id, rate }) {
        let product1 = await this.Prods.findOne({ id });
        if (!product1)
            throw new common_1.HttpException([INVALID_ID], 404);
        rate = parseInt(rate);
        let conc = ` || CONCAT('{"${rate}":', COALESCE(reviewsavg->>'${rate}','0')::int + 1, '}')::jsonb`;
        let product = await this.Prods.query(`
        UPDATE products 
        
        SET reviewsavg = reviewsavg ${conc}
        where products.id = '${id}';`, []);
        let prod = await this.transfS(product.raw[0]);
        return {
            product: prod,
        };
    }
    async updateQty({ id, op, quantity }) {
        let product1 = await this.Prods.findOne({ id });
        if (!product1)
            throw new common_1.HttpException([INVALID_ID], 404);
        quantity = parseInt(quantity);
        let conc = ` COALESCE(quantity,0)::int ${op} ${quantity}`;
        let product = await this.Prods.query(`
        UPDATE products 
        SET quantity = ${conc}
        where products.id = '${id}';`, []);
        let prod = await this.transfS(product.raw[0]);
        return {
            product: prod,
        };
    }
    async update(id, data, user_id) {
        try {
            const product = await this.Prods.findOne({ id });
            if (!product)
                throw new common_1.HttpException([INVALID_ID], 404);
            if (product.user_id == user_id) {
                let product = await this.Prods.createQueryBuilder()
                    .update(product_entity_1.ProductEntity)
                    .set(data)
                    .where(`id = '${id}' `)
                    .returning('*')
                    .execute();
                let prod = await this.transfS(product.raw[0]);
                if (data.price) {
                    await this.client.emit('up_max_price', data.price).toPromise();
                }
                return {
                    product: prod,
                    success: UPDATE_PRODUCT,
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
    async show({ id, select }) {
        if (!class_validator_1.isUUID(id, 4))
            throw new common_1.HttpException([INVALID_ID], 404);
        let product = await this.Prods.query(`
    SELECT * from products
    where id = '${id}' and hide != TRUE
    `);
        if (!product.length)
            throw new common_1.HttpException([INVALID_ID], 404);
        product = product[0];
        product = await this.transfS(product);
        return { product };
    }
    async destroy(id, user_id) {
        const product = await this.Prods.findOne({ id });
        if (!product)
            throw new common_1.HttpException([INVALID_ID], 404);
        if (product.user_id == user_id) {
            this.update(id, { hide: true }, user_id);
            return {
                product,
                success: DELETE_PRODUCT,
            };
        }
        return { errors: [PERMISSION] };
    }
    async destroyEver(id, user_id) {
        const product = await this.Prods.findOne({ id });
        if (!product)
            throw new common_1.HttpException([INVALID_ID], 404);
        if (product.user_id == user_id) {
            await this.Prods.delete({ id });
            return {
                product,
                success: DELETE_PRODUCT_EVER,
            };
        }
        return { errors: [PERMISSION] };
    }
    async decrementProductsStock({ products, property = 'quantity' }) {
        products.forEach((product) => {
            this.Prods.decrement({ id: product.id }, property, product.quantity);
        });
    }
    async incrementProductsStock({ products, property = 'quantity' }) {
        products.forEach((product) => {
            this.Prods.increment({ id: product.id }, property, product.quantity);
        });
    }
    transf(data) {
        for (let i = 0; i < data.length; i++) {
            data[i] = this.transfS(data[i]);
        }
        return data;
    }
    transfS(data) {
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
        let feats = data === null || data === void 0 ? void 0 : data.features;
        if (feats && typeof feats == 'string') {
            let featsS = feats.slice(2, feats.length - 2);
            let featsSP = featsS.split('","');
            data.features = featsSP;
        }
        let colors = data === null || data === void 0 ? void 0 : data.colors;
        if (colors && typeof colors == 'string') {
            let colorsS = colors.slice(2, colors.length - 2);
            let colorsSP = colorsS.split('","');
            data.colors = colorsSP;
        }
        let sizes = data === null || data === void 0 ? void 0 : data.sizes;
        if (sizes && typeof sizes == 'string') {
            let sizesS = sizes.slice(2, sizes.length - 2);
            let sizesSP = sizesS.split('","');
            data.sizes = sizesSP;
        }
        return data;
    }
    async create_idx() {
        let product = await this.Prods.query(`


        CREATE FUNCTION products_tsvector_trigger() RETURNS trigger AS $$
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
            ON products FOR EACH ROW EXECUTE PROCEDURE products_tsvector_trigger();
    
        update products
        set document_with_idx = to_tsvector(title ||' ' || mark || ' ' || category || ' ' || description ),
        document_with_weights = setweight(to_tsvector(title), 'A') ||
        setweight(to_tsvector(mark), 'B') ||
        setweight(to_tsvector(category), 'c') ||
        setweight(to_tsvector(description), 'D') ;
        CREATE INDEX document_idx2
          ON products
          USING GIN (document_with_idx);
        CREATE INDEX document_weights_idx2
          ON products
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
], ProductService.prototype, "client", void 0);
ProductService = __decorate([
    common_1.Injectable(),
    __param(0, typeorm_2.InjectRepository(product_entity_1.ProductEntity)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map