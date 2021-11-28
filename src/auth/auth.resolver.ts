import { Args, Resolver, Mutation } from '@nestjs/graphql';
import { LoginUserInput } from './dto/login-user.input';
import { AuthService } from './auth.service';
import { AccessToken } from './types';

@Resolver(() => AccessToken)
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => AccessToken)
  login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.login(loginUserInput);
  }
}
