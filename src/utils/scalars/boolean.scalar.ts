import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Kind, ValueNode } from 'graphql';

@Scalar('Bool', () => Boolean)
export class BooleanScalar implements CustomScalar<boolean, boolean> {
  description = 'Custom boolean scalar type';

  parseValue(value: boolean): boolean {
    return !!value;
  }

  serialize(value: boolean): boolean {
    return value;
  }

  parseLiteral(ast: ValueNode) {
    if (ast.kind === Kind.BOOLEAN) {
      return !!ast.value;
    }

    return null;
  }
}
