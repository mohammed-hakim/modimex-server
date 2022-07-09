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
exports.OrderService = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("typeorm");
const shared_1 = require("@commerce/shared");
const order_entity_1 = require("./order.entity");
const microservices_1 = require("@nestjs/microservices");
const { INVALID_ID } = shared_1.errors;
const { DELETE_ORDER, DELETE_ORDER_EVER, UPDATE_ORDER, NEW_ORDER, INVALID_PROMO, } = shared_1.success;
const relatedProducts = (x) => {
    return [
        {
            title: 'Delete Product Canceled',
            sentence: `there is ${x} order${x > 1 ? 's' : ''} that contains this product !`,
        },
    ];
};
let OrderService = class OrderService {
    constructor(orders) {
        this.orders = orders;
    }
    async get({ userId, cursor, limit = 20, skip = null, status: statuss }) {
        let arr = [limit + 1, userId];
        let orders = await this.orders.query(`
     select p.*
     from orders p

     where (( 

     p."user_id" = $2
     and p."status" != 'succeeded' 
     ${cursor ? `and p."created_at"::timestamptz <= $3` : ''} 

     ) or (

    p."user_id" = $2
    and   p."status" = 'succeeded' 
  
    ${cursor ? `and p."created_at"::timestamptz <= $3` : ''} 
    
    )
    AND 
    (
      NOT p."hide" = TRUE
    )
    )

    ${statuss ? `AND p."status" = ANY ('{${statuss}}'::text[])` : ''} 
    
    order by p."created_at" DESC
    limit $1
    ${skip ? `offset ${skip} ` : ''}
     `, arr);
        let more = orders.length == limit + 1;
        more && (orders = orders.splice(0, orders.length - 1));
        orders.forEach((x) => {
            var _a;
            x.products = (_a = x === null || x === void 0 ? void 0 : x.vals) === null || _a === void 0 ? void 0 : _a.products;
        });
        orders = this.transf(orders);
        return { orders, more };
    }
    async getAll({ cursor, limit = 20, skip = null, status: statuss }) {
        let arr = [limit + 1];
        let orders = await this.orders.query(`
     select p.*
     from orders p

    where
    (
      (
        ( 
          p."status" != 'succeeded' 
          ${cursor ? `and p."created_at"::timestamptz <= $2` : ''}
        )  

        OR 

        (
          p."status" = 'succeeded' 
          ${cursor ? `and p."updated_at"::timestamptz <= $2` : ''} 
        )
      )
      AND 
      (
        NOT p."hide" = TRUE
      )
      ${statuss ? `AND p."status" = ANY ('{${statuss}}'::text[])` : ''} 
    )
    
    
     
     order by p."updated_at" DESC
     limit $1
     ${skip ? `offset ${skip} ` : ''}
     `, arr);
        let more = orders.length == limit + 1;
        more && (orders = orders.splice(0, orders.length - 1));
        orders.forEach((x) => {
            var _a;
            x.products = (_a = x === null || x === void 0 ? void 0 : x.vals) === null || _a === void 0 ? void 0 : _a.products;
        });
        orders = this.transf(orders);
        return { orders, more };
    }
    async update(id, data) {
        let order = (await this.orders.findOne({ id }));
        if (!order)
            throw new common_1.HttpException([INVALID_ID], 404);
        order = (await this.orders
            .createQueryBuilder()
            .update(order_entity_1.OrderEntity)
            .set(data)
            .where('id = :id ', { id })
            .returning('*')
            .execute());
        return { order };
    }
    async markOrderStatus({ id, status, failedReason }) {
        var _a;
        await this.orders.update(id, {
            status,
            failedReason,
        });
        let order = await this.orders.findOne({ id });
        if (!order)
            throw new common_1.HttpException([INVALID_ID], 404);
        order.products = (_a = order === null || order === void 0 ? void 0 : order.vals) === null || _a === void 0 ? void 0 : _a.products;
        return {
            order,
            success: UPDATE_ORDER,
        };
    }
    async findByIdAndUserId(id, user_id) {
        let p = await this.orders.findOne({ id, user_id });
        if (!p)
            throw new common_1.HttpException([INVALID_ID], 404);
        return p;
    }
    async finWithProductId(id) {
        let f = await this.orders.query(`
    SELECT p."vals" ,p."status"
    FROM   orders p
    WHERE   p."status" = 'pending' and  vals->'products' @> ANY (ARRAY ['[{"id":"${id}"}]']::jsonb[]) AND 
    (
      NOT p."hide" = TRUE
    );
 `);
        if (f.length) {
            return { errors: relatedProducts(f.length) };
        }
        else {
            return false;
        }
    }
    async create({ products, user_id, shipping, code }) {
        const INITIAL_VALUE = 0;
        const total_price = products.reduce((accumulator, product) => accumulator + product.ordered_quantity * product.price, INITIAL_VALUE);
        const databaseProducts = products.map((product) => {
            let dt = {
                id: product.id,
                quantity: product.ordered_quantity,
                color: product.color,
                size: product.size,
                children: product.children,
            };
            if (product.offerId) {
                dt['offerId'] = product.offerId;
            }
            return dt;
        });
        const actualProducts = products.map((product) => {
            product.quantity = product.quantity - product.ordered_quantity;
            delete product.ordered_quantity;
            return Object.assign({}, product);
        });
        products = databaseProducts;
        let dota = {
            vals: { products },
            user_id,
            shipping,
            total_price,
        };
        let errors = [];
        if (code) {
            let valid = await this.client.send('find_promo', code).toPromise();
            if (valid) {
                await this.client.send('add_promo_user', valid).toPromise();
            }
            if (valid) {
                dota['code'] = valid;
            }
            else {
                errors = [INVALID_PROMO];
            }
        }
        const order = await this.orders.create(dota);
        await this.orders.save(order);
        order.products = actualProducts;
        return {
            order,
            errors,
            success: NEW_ORDER,
        };
    }
    async destroy({ id, user_id }) {
        var _a;
        try {
            if (!id || !user_id) {
                throw new common_1.HttpException([INVALID_ID], 404);
            }
            const order = await this.orders.findOne({
                where: { id, user_id },
            });
            if (!order) {
                throw new common_1.HttpException([INVALID_ID], 404);
            }
            this.update(order.id, { hide: true });
            order.products = (_a = order === null || order === void 0 ? void 0 : order.vals) === null || _a === void 0 ? void 0 : _a.products;
            return {
                order,
                success: DELETE_ORDER,
            };
        }
        catch (error) {
            return { errors: [INVALID_ID] };
        }
    }
    async destroyEver({ id, user_id }) {
        var _a;
        try {
            if (!id || !user_id) {
                throw new common_1.HttpException([INVALID_ID], 404);
            }
            const order = await this.orders.findOne({
                where: { id, user_id },
            });
            if (!order) {
                throw new common_1.HttpException([INVALID_ID], 404);
            }
            await this.orders.delete({ id });
            order.products = (_a = order === null || order === void 0 ? void 0 : order.vals) === null || _a === void 0 ? void 0 : _a.products;
            return {
                order,
                success: DELETE_ORDER_EVER,
            };
        }
        catch (error) {
            return { errors: [INVALID_ID] };
        }
    }
    transf(data) {
        for (let i = 0; i < data.length; i++) {
            data[i] = this.transfS(data[i]);
        }
        return data;
    }
    transfS(data) {
        let code = data === null || data === void 0 ? void 0 : data.code;
        if (code && typeof code == 'string') {
            data.code = JSON.parse(code);
        }
        return data;
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
    common_1.Injectable(),
    __param(0, typeorm_1.InjectRepository(order_entity_1.OrderEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], OrderService);
exports.OrderService = OrderService;
//# sourceMappingURL=order.service.js.map