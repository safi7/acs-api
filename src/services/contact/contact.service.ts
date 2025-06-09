import { Injectable } from '@nestjs/common';
import { sendEmailInterface } from 'src/common/interfaces/email.interface';
import { SendgridProvider } from 'src/providers/sendgrid/sendgrid.provider';

@Injectable()
export class ContactService {
  constructor(
    private contactP: SendgridProvider
  ) {}


 async sendFeedback(input: sendEmailInterface) {
    return await this.contactP.sendEmail(input);
  }
}
