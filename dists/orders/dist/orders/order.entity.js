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
exports.OrderEntity = void 0;
const typeorm_1 = require("typeorm");
let OrderEntity = class OrderEntity extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn('uuid'),
    __metadata("design:type", String)
], OrderEntity.prototype, "id", void 0);
__decorate([
    typeorm_1.Column('text'),
    __metadata("design:type", String)
], OrderEntity.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "shipping", void 0);
__decorate([
    typeorm_1.Column('simple-json', { nullable: true }),
    __metadata("design:type", Object)
], OrderEntity.prototype, "code", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "shipping_id", void 0);
__decorate([
    typeorm_1.Column('float', { default: 0 }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "total_price", void 0);
__decorate([
    typeorm_1.Column('float', { default: 0 }),
    __metadata("design:type", Number)
], OrderEntity.prototype, "total_price2", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "color", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "size", void 0);
__decorate([
    typeorm_1.Column('text', { nullable: true }),
    __metadata("design:type", String)
], OrderEntity.prototype, "failedReason", void 0);
__decorate([
    typeorm_1.Column('boolean', { nullable: true, default: false }),
    __metadata("design:type", Boolean)
], OrderEntity.prototype, "hide", void 0);
__decorate([
    typeorm_1.Column({ type: 'simple-json', nullable: true }),
    __metadata("design:type", Object)
], OrderEntity.prototype, "products", void 0);
__decorate([
    typeorm_1.Column({ type: 'jsonb', nullable: true }),
    __metadata("design:type", Object)
], OrderEntity.prototype, "vals", void 0);
__decorate([
    typeorm_1.Column({
        enum: ['pending', 'failed', 'succeeded'],
        default: 'pending',
    }),
    __metadata("design:type", String)
], OrderEntity.prototype, "status", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", Date)
], OrderEntity.prototype, "created_at", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", Date)
], OrderEntity.prototype, "updated_at", void 0);
OrderEntity = __decorate([
    typeorm_1.Entity('orders')
], OrderEntity);
exports.OrderEntity = OrderEntity;
//# sourceMappingURL=order.entity.js.map