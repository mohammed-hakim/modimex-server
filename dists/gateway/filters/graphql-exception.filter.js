"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLErrorFilter = void 0;
const common_1 = require("@nestjs/common");
let GraphQLErrorFilter = class GraphQLErrorFilter {
    catch(exception, host) {
        var _a, _b, _c;
        let lang = (_c = (_b = (_a = host.switchToHttp().getNext()) === null || _a === void 0 ? void 0 : _a.req) === null || _b === void 0 ? void 0 : _b.headers) === null || _c === void 0 ? void 0 : _c.lang;
        let data = exception.getResponse();
        data.forEach((h, i) => {
            if (h.en) {
                data[i] = data[i][lang];
            }
        });
        return { errors: exception.getResponse() };
    }
};
GraphQLErrorFilter = __decorate([
    common_1.Catch(common_1.HttpException)
], GraphQLErrorFilter);
exports.GraphQLErrorFilter = GraphQLErrorFilter;
//# sourceMappingURL=graphql-exception.filter.js.map