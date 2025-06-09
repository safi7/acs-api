import { Injectable } from '@nestjs/common';
import { sendEmailInterface } from 'src/common/interfaces/email.interface';
import mainConfig from 'src/configs/main.config';
import * as sgMail from '@sendgrid/mail';

@Injectable()
export class SendgridProvider {

  constructor() {
    sgMail.setApiKey(`${mainConfig.sendgrid_api_key}`);
  }

  async sendEmail(input: sendEmailInterface) {
   const message = {
      from: `${mainConfig.from_email}`,
      to: mainConfig.target_email,
      subject: `Customer Feedback ${input.name}`,
      text: `Name: ${input.name}\n Email: ${input.email}, Message: ${input.message}`
    };
   return await sgMail.send(message);
  }
}
