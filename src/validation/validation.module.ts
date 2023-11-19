import { Module } from '@nestjs/common';
import { IsNotEmptyStringConstraint } from './is-not-empty-string.validation';
import { MatchConstraint } from './match.validation';
import { IsGreaterOrEqualThanConstraint } from './is-greater-or-equal-than';

@Module({
  providers: [
    IsNotEmptyStringConstraint,
    MatchConstraint,
    IsGreaterOrEqualThanConstraint
  ],
  exports: [
    IsNotEmptyStringConstraint,
    MatchConstraint,
    IsGreaterOrEqualThanConstraint
  ]
})
export class ValidationModule {}
