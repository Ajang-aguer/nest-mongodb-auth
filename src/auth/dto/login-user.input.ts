import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, MinLength } from 'class-validator';

@InputType()
export class LoginUserInput {
  @IsEmail({}, { message: 'Please enter valid email' })
  @Field()
  email: string;

  @MinLength(8, { message: 'Password must contain at least 8 characters' })
  @Field()
  password: string;
}
