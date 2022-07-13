import { BadRequestException } from '@nestjs/common';
export declare class ValidationException extends BadRequestException {
    ValidationErrors: string[];
    constructor(ValidationErrors: string[]);
}
