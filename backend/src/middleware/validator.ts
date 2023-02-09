import { ResultCode } from '@src/common';
import { plainToClass } from 'class-transformer';
import { validate, ValidationError } from 'class-validator';

abstract class DTO {
  static async factory<T extends DTO>(Class: new () => T, partial: Partial<T>): Promise<T> {
    const dto = plainToClass(Class, partial);

    const errors = await validate(dto);

    if (errors.length > 0) {
      const err: ValidationError = errors[0];
      let message = 'invalid parameter';

      if (err.constraints) {
        message = Object.values(err.constraints)[0];
      } else if (err.children && err.children[0].constraints) {
        console.log(Object.values(err.children[0].constraints));
        message = Object.values(err.children[0].constraints)[0];
      }

      throw { ...ResultCode.INVALID_PARAM, message };
    }
    0;
    return dto;
  }
}

export default DTO;
