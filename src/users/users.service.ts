import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
  } from '@nestjs/common';
  import { InjectModel } from '@nestjs/mongoose';
  import { Model } from 'mongoose';
  import { hash } from 'bcrypt';
  import { v4 as uuidv4 } from 'uuid';
  import { CreateUserInput } from './dto/create-user.input';
  import { User, UserDocument } from './schemas/users.schema';
  import { ActivateUserInput } from './dto/activate-user.input';
  import { MailService } from 'src/mail/mail.service';
  import { UpdateUserInput } from './dto/update-user.input';
  
  @Injectable()
  export class UsersService {
    constructor(
      @InjectModel(User.name) private userModel: Model<UserDocument>,
      private mailService: MailService,
    ) {}
  
    async create(createUserInput: CreateUserInput): Promise<User> {
      try {
        const candidate = await this.userModel.findOne({
          email: createUserInput.email,
        });
  
        if (candidate) {
          throw new BadRequestException('User with such email already exists');
        }
  
        createUserInput.password = await hash(createUserInput.password, 10);
  
        const activationToken = uuidv4();
  
        const user = new this.userModel({
          ...createUserInput,
          activationToken,
        });
        await user.save();
  
        await this.mailService.sendConfirmationEmail(user, activationToken);
  
        return user;
      } catch (e) {
        throw new InternalServerErrorException(
          e,
          'Something went wrong during user creation, try again later',
        );
      }
    }
  
    async activate(activateUserInput: ActivateUserInput): Promise<string> {
      try {
        const user = await this.userModel.findOne({
          activationToken: activateUserInput.token,
        });
  
        if (!user) {
          throw new NotFoundException('No user found to activate');
        } else if (user.isActive) {
          throw new BadRequestException('User is already activated');
        }
  
        user.isActive = true;
        await user.save();
  
        return 'User was activated!';
      } catch (e) {
        throw new InternalServerErrorException(
          e,
          'Something went wrong during user activating, try again later',
        );
      }
    }
  
    async update(updateUserInput: UpdateUserInput): Promise<User> | null {
      try {
        const user = await this.userModel.findOneAndUpdate(
          { id: updateUserInput.id },
          updateUserInput,
        );
  
        if (!user) {
          throw new NotFoundException('No user found to update');
        }
  
        return user;
      } catch (e) {
        throw new InternalServerErrorException(
          e,
          'Something went wrong during user updating, try again later',
        );
      }
    }
  
    async findOne(key: string, value: string): Promise<User | undefined> {
      return this.userModel.findOne({ [key]: value });
    }
  }
  