import { Transform } from 'class-transformer';
import { IsString } from 'class-validator';
import { HtmlSanitizer } from '../validators/html-sanitizer.validator';

export class CategoryCreateDto {
  @IsString()
  @Transform(HtmlSanitizer)
  title: string;

  @IsString()
  @Transform(HtmlSanitizer)
  description: string;

  @IsString()
  @Transform(HtmlSanitizer)
  imageUrl: string;

  @IsString()
  @Transform(HtmlSanitizer)
  slug: string;
}

export class ProductCreateDto {
  @IsString()
  @Transform(HtmlSanitizer)
  name: string;

  @IsString()
  @Transform(HtmlSanitizer)
  shortDescription: string;

  @IsString()
  @Transform(HtmlSanitizer)
  manufacturer: string;

  @IsString()
  @Transform(HtmlSanitizer)
  certifications: string;

  @IsString()
  @Transform(HtmlSanitizer)
  specifications: string;

  @IsString()
  @Transform(HtmlSanitizer)
  imageUrl: string;

  @IsString()
  @Transform(HtmlSanitizer)
  categorySlug: string;
}
