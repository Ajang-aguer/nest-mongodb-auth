import { Field, InputType } from '@nestjs/graphql';
import {
  IsAlpha,
  IsEmail,
  IsNumberString,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @IsString()
  @IsAlpha('en-US', { message: 'Name must contain letters only' })
  @Field()
  name: string;

  @IsOptional()
  @IsString()
  @IsAlpha('en-US', { message: 'Surname must contain letters only' })
  @Field({ nullable: true })
  surname?: string;

  @IsString()
  @IsAlpha('en-US', { message: 'Last name must contain letters only' })
  @Field()
  lastname: string;

  @IsEmail({}, { message: 'Please enter valid email' })
  @Field()
  email: string;

  @IsString()
  @MinLength(8, { message: 'Password must contain at least 8 characters' })
  @Field()
  password: string;

  @IsOptional()
  @IsString()
  @IsNumberString({}, { message: 'Phone number must contain digits only' })
  @Field({ nullable: true })
  phone?: string;

  @IsOptional()
  @IsString()
  @IsAlpha('en-US', { message: 'Populated area must contain letters only' })
  @Field({ nullable: true })
  location?: string;

  @IsOptional()
  @IsString()
  @Field({ nullable: true })
  address?: string;
}
