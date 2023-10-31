import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface
} from 'class-validator';

@ValidatorConstraint({ async: false, name: 'Match' })
export class MatchConstraint implements ValidatorConstraintInterface {
  validate(value: any, validationArguments?: ValidationArguments) {
    if (validationArguments) {
      const [relatedPropertyName] = validationArguments.constraints;
      const relatedValue = (validationArguments.object as any)[
        relatedPropertyName
      ];
      return value === relatedValue;
    }

    return true;
  }

  defaultMessage(validationArguments: ValidationArguments): string {
    const [relatedPropertyName] = validationArguments.constraints;
    return `$property don't match ${relatedPropertyName}`;
  }
}

export function Match(property: string, validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [property],
      validator: MatchConstraint
    });
  };
}
