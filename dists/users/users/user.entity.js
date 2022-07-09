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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = require("jsonwebtoken");
const shared_1 = require("@commerce/shared");
const argon2_1 = require("argon2");
let UserEntity = class UserEntity extends typeorm_1.BaseEntity {
    async hashPassword() {
        let hashpass = await argon2_1.hash(this.password);
        this.password = hashpass;
    }
    get token() {
        const { id, seller, is_admin } = this;
        return jsonwebtoken_1.sign({ id, seller, is_admin }, shared_1.config.JWT_TOKEN, {
            expiresIn: shared_1.config.JWT_TOKEN_EXPIRATION,
        });
    }
    toResponseObject(showToken = true) {
        const { id, created_at, name, email, token, updated_at, seller, bought_items, phone, adress, is_admin, purshases, money, gateway_customer_id, } = this;
        let responseObject = {
            id,
            name,
            email,
            created_at,
            updated_at,
            seller,
            is_admin,
            purshases,
            money,
            bought_items,
            phone,
            adress,
            gateway_customer_id,
        };
        if (showToken) {
            responseObject.token = token;
        }
        return responseObject;
    }
};
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "gateway_customer_id", void 0);
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean' }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "seller", void 0);
__decorate([
    typeorm_1.Column({ type: 'boolean', nullable: true, default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "is_admin", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], UserEntity.prototype, "name", void 0);
__decorate([
    typeorm_1.Column('text', { unique: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    typeorm_1.Column('text', { unique: true, nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "phone", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "adress", void 0);
__decorate([
    typeorm_1.Column({ type: 'jsonb', nullable: true, default: [] }),
    __metadata("design:type", Array)
], UserEntity.prototype, "purshases", void 0);
__decorate([
    typeorm_1.Column('float', { nullable: true, default: 0 }),
    __metadata("design:type", Number)
], UserEntity.prototype, "money", void 0);
__decorate([
    typeorm_1.Column({ type: 'jsonb', nullable: true, default: [] }),
    __metadata("design:type", Array)
], UserEntity.prototype, "promos", void 0);
__decorate([
    typeorm_1.Column('float', { nullable: true, default: 0 }),
    __metadata("design:type", Number)
], UserEntity.prototype, "moneyreal", void 0);
__decorate([
    typeorm_1.Column('integer', { nullable: true, default: 0 }),
    __metadata("design:type", Number)
], UserEntity.prototype, "bought_items", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], UserEntity.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], UserEntity.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column('tsvector', { nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "document", void 0);
__decorate([
    typeorm_1.Column('tsvector', { nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "document_with_idx", void 0);
__decorate([
    typeorm_1.Column('tsvector', { nullable: true }),
    __metadata("design:type", String)
], UserEntity.prototype, "document_with_weights", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserEntity.prototype, "hashPassword", null);
UserEntity = __decorate([
    typeorm_1.Entity('users')
], UserEntity);
exports.UserEntity = UserEntity;
//# sourceMappingURL=user.entity.js.map