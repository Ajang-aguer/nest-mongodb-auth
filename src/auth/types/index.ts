import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export abstract class AccessToken {
  @Field()
  access_token: string;
}
