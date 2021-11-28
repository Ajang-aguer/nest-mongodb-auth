import { Injectable, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcrypt';
import { User } from 'src/users/schemas/users.schema';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserInput } from './dto/login-user.input';
import { mapUserToUpdateInput } from 'src/utils/users/helpers';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  /**
   * Validate entered credentials on login
   * @param {LoginUserInput} loginUserInput - object with entered credentials credentials
   * @param {string} email - entered email
   * @param {string} password - entered password
   * @returns {User | null} object with user's data or null if user does not exists
   */
  async validateUser({
    email,
    password,
  }: LoginUserInput): Promise<User> | null {
    const user = await this.usersService.findOne('email', email);
    const isSamePassword = await compare(password, user.password);

    if (!user || !isSamePassword) {
      return null;
    }

    return user;
  }

  /**
   * Used to login user in system
   * @param {LoginUserInput} loginUserInput - object with entered credentials credentials
   * @param {string} email - entered email
   * @param {string} password - entered password
   * @returns {User | null} object with jwt access token or null if credentials are wrong
   */
  async login(
    loginUserInput: LoginUserInput,
  ): Promise<{ access_token: string }> | null {
    const candidate = await this.validateUser(loginUserInput);

    if (!candidate) {
      throw new UnauthorizedException('Wrong credentials. Please, try again');
    }

    const loggedInUser = Object.assign(candidate, { lastLogin: Date.now() });
    await this.usersService.update(mapUserToUpdateInput(loggedInUser));

    const payload = {
      sub: candidate.id,
      name: `${candidate.name} ${candidate.lastname}`,
      email: candidate.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Verify JWT access token
   * @param {string} token - access token from request
   * @returns {User | null} object with user's data or null if token is not valid
   */
  async verify(token: string): Promise<User> | null {
    const decoded = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    const user = await this.usersService.findOne('email', decoded.email);

    if (!user) {
      throw new UnauthorizedException(
        'Something went wrong during auth token validation',
      );
    }

    return user;
  }
}
