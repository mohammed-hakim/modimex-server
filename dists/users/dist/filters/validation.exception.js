"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ValidationException = void 0;
const common_1 = require("@nestjs/common");
class ValidationException extends common_1.BadRequestException {
    constructor(ValidationErrors) {
        super();
        this.ValidationErrors = ValidationErrors;
    }
}
exports.ValidationException = ValidationException;
//# sourceMappingURL=validation.exception.js.map