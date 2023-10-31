import { Module } from '@nestjs/common';
import { IsNotEmptyStringConstraint } from './is-not-empty-string.validation';
import { MatchConstraint } from './match.validation';

@Module({
  providers: [IsNotEmptyStringConstraint, MatchConstraint],
  exports: [IsNotEmptyStringConstraint, MatchConstraint]
})
export class ValidationModule {}
