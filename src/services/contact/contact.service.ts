import { Injectable } from '@nestjs/common';
import { sendEmailInterface } from 'src/common/interfaces/email.interface';
import { SendgridProvider } from 'src/providers/sendgrid/sendgrid.provider';
import { TelegramProvider } from 'src/providers/telegram/telegram.provider';

@Injectable()
export class ContactService {
  constructor(
    private contactP: SendgridProvider,
    private telegramP: TelegramProvider
  ) {}

  async sendFeedback(input: sendEmailInterface) {
    return await this.contactP.sendEmail(input);
  }

  async sendTelegramMessage(input: sendEmailInterface) {
    const formattedMessage = `
          <b>📥 New Inquiry Received</b>\n
          <b>Name:</b> ${input.name}\n
          <b>Email:</b> ${input.email}\n\n
          <b>Message:</b> ${input.message}.
          `;
    return await this.telegramP.sendMessage(formattedMessage);
  }
}
