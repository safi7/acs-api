import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { FeedbackDto } from 'src/common/dto/contact.dto';
import { ContactService } from 'src/services/contact/contact.service';
import { isValidEmail } from 'src/common/validators/email.validator';

@Controller('contact')
export class ContactController {
  constructor(private contactS: ContactService) {}

  @Post()
  async sendFeedback(@Body() params: FeedbackDto): Promise<{ status: string }> {
    if (!isValidEmail(params.email)) {
      throw new HttpException('invalid_email', HttpStatus.BAD_REQUEST);
    }

    try {
      await this.contactS.sendTelegramMessage(params);
    } catch (err) {
      console.log('err', err);
      throw new HttpException('could_not_send_a_feedback', HttpStatus.BAD_REQUEST);
    }

    return { status: 'okay' };
  }
}
