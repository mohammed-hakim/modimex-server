import { BadRequestException } from '@nestjs/common';

export class ValidationException extends BadRequestException {
  constructor(public ValidationErrors: string[]) {
    super();
  }
}
