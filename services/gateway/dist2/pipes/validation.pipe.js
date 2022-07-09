"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationPipeEr = void 0;
const common_1 = require("@nestjs/common");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
let ValidationPipeEr = class ValidationPipeEr {
    async transform(value, { metatype }) {
        if (value instanceof Object && this.isEmpty(value)) {
            throw new common_1.HttpException({ msg: 'No body submmited', status: 400 }, common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        if (!metatype || !this.toValidate(metatype)) {
            return value;
        }
        const object = class_transformer_1.plainToClass(metatype, value);
        const errors = await class_validator_1.validate(object);
        if (errors.length > 0) {
            throw new common_1.HttpException(this.formatErrors(errors), common_1.HttpStatus.UNPROCESSABLE_ENTITY);
        }
        return value;
    }
    formatErrors(errors) {
        return errors.map((err) => {
            for (let property in err.constraints) {
                let field = err.constraints[property].split(' ')[0];
                let x = { field };
                x['msg'] = err.constraints[property];
                return x;
            }
        });
    }
    isEmpty(value) {
        return !(Object.keys(value).length > 0);
    }
    toValidate(metatype) {
        const types = [String, Boolean, Number, Array, Object];
        return !types.includes(metatype);
    }
};
ValidationPipeEr = __decorate([
    common_1.Injectable()
], ValidationPipeEr);
exports.ValidationPipeEr = ValidationPipeEr;
//# sourceMappingURL=validation.pipe.js.map