import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import mainConfig from 'src/configs/main.config';
import  axios from 'axios';

@Injectable()
export class TelegramProvider {

  constructor() {
  }

  async sendMessage(message: string) {
    try {
      const payload = {
        chat_id: mainConfig.telegram_channel_id,
        text: message,
        parse_mode: 'HTML' 
      };

      await axios.post(`${mainConfig.telegram_api_url}`, payload);
    } catch (error) {
      console.log('error', error);
      throw new HttpException('Failed to send message', HttpStatus.EXPECTATION_FAILED)
    }
  }
}
