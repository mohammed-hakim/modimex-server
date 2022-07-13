import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class ValidationPipeEr implements PipeTransform<any> {
    transform(value: any, { metatype }: ArgumentMetadata): Promise<any>;
    private formatErrors;
    private isEmpty;
    private toValidate;
}
