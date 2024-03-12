import { Injectable } from '@nestjs/common';
import {
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator
} from 'class-validator';

@ValidatorConstraint({ async: false, name: 'IsGreaterOrEqualThan' })
@Injectable()
export class IsGreaterOrEqualThanConstraint
  implements ValidatorConstraintInterface
{
  validate(
    value: any,
    validationArguments: ValidationArguments
  ): boolean | Promise<boolean> {
    const [comparedPropertyName] = validationArguments.constraints;
    const comparedValue = (validationArguments.object as any)[
      comparedPropertyName
    ];

    if (comparedValue === undefined) return true;
    return !(value < comparedValue);
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const [comparedPropertyName] = validationArguments.constraints;
    return `$property must be equal or greater than ${comparedPropertyName}`;
  }
}

export function IsGreaterOrEqualThan(
  property: string,
  validationOptions?: ValidationOptions
) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [property],
      validator: IsGreaterOrEqualThanConstraint
    });
  };
}
