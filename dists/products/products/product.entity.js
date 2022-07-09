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
exports.ProductEntity = exports.roleTransformer = void 0;
const typeorm_1 = require("typeorm");
exports.roleTransformer = {
    to: (value) => '{' + value.filter((role) => role).join(',') + '}',
    from: (value) => value
        .replace(/\{|\}/g, '')
        .split(',')
        .filter((role) => role),
};
let ProductEntity = class ProductEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], ProductEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], ProductEntity.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column('text', { unique: true }),
    __metadata("design:type", String)
], ProductEntity.prototype, "title", void 0);
__decorate([
    typeorm_1.Column('float', { nullable: true }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "price", void 0);
__decorate([
    typeorm_1.Column('float', { default: 0 }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "oldprice", void 0);
__decorate([
    typeorm_1.Column('integer', { default: 1 }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column('float', { default: 0, nullable: true }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "sells", void 0);
__decorate([
    typeorm_1.Column('boolean', { nullable: true, default: false }),
    __metadata("design:type", Boolean)
], ProductEntity.prototype, "hide", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], ProductEntity.prototype, "category", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], ProductEntity.prototype, "mark", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], ProductEntity.prototype, "description", void 0);
__decorate([
    typeorm_1.Column('text', { array: true }),
    __metadata("design:type", Array)
], ProductEntity.prototype, "features", void 0);
__decorate([
    typeorm_1.Column('text', { array: true }),
    __metadata("design:type", Array)
], ProductEntity.prototype, "colors", void 0);
__decorate([
    typeorm_1.Column('text', { array: true }),
    __metadata("design:type", Array)
], ProductEntity.prototype, "sizes", void 0);
__decorate([
    typeorm_1.Column('text', { array: true }),
    __metadata("design:type", Array)
], ProductEntity.prototype, "images", void 0);
__decorate([
    typeorm_1.Column('text', { array: true }),
    __metadata("design:type", Array)
], ProductEntity.prototype, "blured_images", void 0);
__decorate([
    typeorm_1.Column('tsvector', { nullable: true }),
    __metadata("design:type", String)
], ProductEntity.prototype, "document", void 0);
__decorate([
    typeorm_1.Column('tsvector', { nullable: true }),
    __metadata("design:type", String)
], ProductEntity.prototype, "document_with_idx", void 0);
__decorate([
    typeorm_1.Column('tsvector', { nullable: true }),
    __metadata("design:type", String)
], ProductEntity.prototype, "document_with_weights", void 0);
__decorate([
    typeorm_1.CreateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn({ type: 'timestamp' }),
    __metadata("design:type", Number)
], ProductEntity.prototype, "updated_at", void 0);
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
], ProductEntity.prototype, "reviewsavg", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], ProductEntity.prototype, "reviews", void 0);
ProductEntity = __decorate([
    typeorm_1.Entity('products')
], ProductEntity);
exports.ProductEntity = ProductEntity;
//# sourceMappingURL=product.entity.js.map