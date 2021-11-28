import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

export type RoleDocument = Role & mongoose.Document;

@Schema()
@ObjectType()
export class Role {
  @Field()
  @Prop({ required: true })
  name: string;

  // @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Permission' }] })
  // permissions: Permission[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
