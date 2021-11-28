import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { ActivateUserInput } from './dto/activate-user.input';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './schemas/users.schema';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Mutation(() => String)
  activateUser(
    @Args('activateUserInput') activateUserInput: ActivateUserInput,
  ) {
    return this.usersService.activate(activateUserInput);
  }
}
