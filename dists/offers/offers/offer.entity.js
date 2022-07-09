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
exports.OfferEntity = exports.roleTransformer = void 0;
const typeorm_1 = require("typeorm");
exports.roleTransformer = {
    to: (value) => '{' + value.filter((role) => role).join(',') + '}',
    from: (value) => value
        .replace(/\{|\}/g, '')
        .split(',')
        .filter((role) => role),
};
let OfferEntity = class OfferEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], OfferEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], OfferEntity.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column('uuid', { array: true }),
    __metadata("design:type", Array)
], OfferEntity.prototype, "products_ids", void 0);
__decorate([
    typeorm_1.Column('text', { unique: true }),
    __metadata("design:type", String)
], OfferEntity.prototype, "title", void 0);
__decorate([
    typeorm_1.Column('float', { nullable: true }),
    __metadata("design:type", Number)
], OfferEntity.prototype, "price", void 0);
__decorate([
    typeorm_1.Column('float', { default: 0 }),
    __metadata("design:type", Number)
], OfferEntity.prototype, "original_price", void 0);
__decorate([
    typeorm_1.Column('integer', { default: 1 }),
    __metadata("design:type", Number)
], OfferEntity.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column('integer', { default: 0, nullable: true }),
    __metadata("design:type", Number)
], OfferEntity.prototype, "sells", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true, default: '' }),
    __metadata("design:type", String)
], OfferEntity.prototype, "category", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true, default: '' }),
    __metadata("design:type", String)
], OfferEntity.prototype, "mark", void 0);
__decorate([
    typeorm_1.Column('text', { array: true, nullable: true, default: '{}' }),
    __metadata("design:type", Array)
], OfferEntity.prototype, "features", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], OfferEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column('boolean', { nullable: true }),
    __metadata("design:type", Boolean)
], OfferEntity.prototype, "hide", void 0);
__decorate([
    typeorm_1.Column('text', { array: true }),
    __metadata("design:type", Array)
], OfferEntity.prototype, "images", void 0);
__decorate([
    typeorm_1.Column('text', { array: true }),
    __metadata("design:type", Array)
], OfferEntity.prototype, "blured_images", void 0);
__decorate([
    typeorm_1.Column('tsvector', { nullable: true }),
    __metadata("design:type", String)
], OfferEntity.prototype, "document", void 0);
__decorate([
    typeorm_1.Column('tsvector', { nullable: true }),
    __metadata("design:type", String)
], OfferEntity.prototype, "document_with_idx", void 0);
__decorate([
    typeorm_1.Column('tsvector', { nullable: true }),
    __metadata("design:type", String)
], OfferEntity.prototype, "document_with_weights", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Number)
], OfferEntity.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Number)
], OfferEntity.prototype, "updated_at", void 0);
__decorate([
    typeorm_1.Column('jsonb', {
        nullable: true,
        default: {
            '1': 0,
            '2': 0,
            '3': 0,
            '4': 0,
            '5': 0,
        },
    }),
    __metadata("design:type", Object)
], OfferEntity.prototype, "reviewsavg", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], OfferEntity.prototype, "reviews", void 0);
OfferEntity = __decorate([
    typeorm_1.Entity('offers')
], OfferEntity);
exports.OfferEntity = OfferEntity;
//# sourceMappingURL=offer.entity.js.map