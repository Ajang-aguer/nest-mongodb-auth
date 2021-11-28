import { Field, InputType } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class ActivateUserInput {
  @IsString({ message: 'Activation link is invalid' })
  @Field()
  token: string;
}
