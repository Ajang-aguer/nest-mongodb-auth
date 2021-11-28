import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { v4 as uuid4 } from 'uuid';
import { CUSTOMER_ROLE_ID } from 'src/constants';
import { Role } from 'src/roles/schemas/roles.schema';

export type UserDocument = User & mongoose.Document;

@Schema()
@ObjectType()
export class User {
  @Field(() => ID, { defaultValue: uuid4() })
  @Prop({ default: uuid4() })
  id: string;

  @Field()
  @Prop({ required: true })
  name: string;

  @Field({ nullable: true })
  @Prop()
  surname?: string;

  @Field()
  @Prop({ required: true })
  lastname: string;

  @Field()
  @Prop({ unique: true, required: true })
  email: string;

  @Field()
  @Prop({ required: true })
  password: string;

  @Field({ nullable: true })
  @Prop()
  phone?: string;

  @Field({ nullable: true })
  @Prop()
  location?: string;

  @Field({ nullable: true })
  @Prop()
  address?: string;

  @Field(() => Boolean, { defaultValue: false })
  @Prop({ type: mongoose.Schema.Types.Boolean, default: false })
  isSuspended: boolean;

  @Field(() => Boolean, { defaultValue: false })
  @Prop({ type: mongoose.Schema.Types.Boolean, default: false })
  isActive: boolean;

  @Field()
  @Prop({ required: true })
  activationToken: string;

  @Field({ nullable: true })
  @Prop()
  lastLogin?: string;

  @Field({ defaultValue: Date.now() })
  @Prop({ default: Date.now() })
  joinedAt: string;

  @Field(() => ID, { defaultValue: CUSTOMER_ROLE_ID })
  @Prop({
    required: true,
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Role',
    default: CUSTOMER_ROLE_ID,
    autopopulate: true,
  })
  role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
