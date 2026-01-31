import { Injectable } from '@nestjs/common';
import { sendEmailInterface } from 'src/common/interfaces/email.interface';
import { TelegramProvider } from 'src/providers/telegram/telegram.provider';

@Injectable()
export class ContactService {
  constructor(
    private telegramP: TelegramProvider
  ) {}

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
