import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isNotEmpty,
  isString,
  registerDecorator
} from 'class-validator';

@ValidatorConstraint({ async: false, name: 'IsNotEmptyConstraint' })
@Injectable()
export class IsNotEmptyStringConstraint
  implements ValidatorConstraintInterface
{
  validate(value: any): boolean | Promise<boolean> {
    if (isString(value)) {
      const trimmedValue = value.trim();
      return isNotEmpty(trimmedValue);
    }
    return false;
  }

  defaultMessage?(): string {
    return '$property must be a not empty string';
  }
}

export function IsNotEmptyString(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsNotEmptyStringConstraint
    });
  };
}
