import { Transform } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';
import { HtmlSanitizer } from '../validators/html-sanitizer.validator';

export class FeedbackDto {
  @IsString()
  @Transform(HtmlSanitizer)
  name: string;

  @IsEmail()
  @Transform(HtmlSanitizer)
  email: string;

  @IsString()
  @Transform(HtmlSanitizer)
  message: string;
}

