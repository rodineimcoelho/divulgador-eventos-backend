import { Injectable } from '@nestjs/common';
import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator
} from 'class-validator';
import { UsersService } from '../users.service';

@ValidatorConstraint({ async: true, name: 'IsUniqueEmailConstraint' })
@Injectable()
export class IsUniqueEmailConstraint implements ValidatorConstraintInterface {
  constructor(private usersService: UsersService) {}

  async validate(value: any): Promise<boolean> {
    return !(await this.usersService.findByEmail(value));
  }

  defaultMessage?(): string {
    return 'email already in use';
  }
}

export function IsUniqueEmail(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsUniqueEmailConstraint
    });
  };
}
