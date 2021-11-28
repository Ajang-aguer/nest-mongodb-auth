import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { User } from 'src/users/schemas/users.schema';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendConfirmationEmail(user: User, token: string) {
    const url = `${process.env.CLIENT_URL}/profile/activate/${token}`;

    await this.mailerService.sendMail({
      to: user.email,
      subject: 'Welcome to Nest E-commerce! Please confirm your email',
      template: './confirmation',
      context: {
        name: user.name,
        url,
      },
    });
  }
}
