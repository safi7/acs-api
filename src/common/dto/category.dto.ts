import { Transform } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';
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
  slug: string;

  @IsString()
  @Transform(HtmlSanitizer)
  categorySlug: string;

  @IsOptional()
  @IsString()
  @Transform(HtmlSanitizer)
  type?: string;

  @IsOptional()
  @IsString()
  @Transform(HtmlSanitizer)
  composition?: string;

  @IsOptional()
  @IsString()
  @Transform(HtmlSanitizer)
  coating?: string;

  @IsOptional()
  @IsString()
  @Transform(HtmlSanitizer)
  colour?: string;

  @IsOptional()
  @IsString()
  @Transform(HtmlSanitizer)
  tissueReaction?: string;

  @IsOptional()
  @IsString()
  @Transform(HtmlSanitizer)
  absorption?: string;

  @IsOptional()
  @IsString()
  @Transform(HtmlSanitizer)
  presentation?: string;

  @IsOptional()
  @IsString()
  @Transform(HtmlSanitizer)
  needleTypeUrl?: string;

  @IsOptional()
  @IsString()
  @Transform(HtmlSanitizer)
  completeSheet?: string;

  @IsOptional()
  @IsString()
  @Transform(HtmlSanitizer)
  indications?: string;

  @IsOptional()
  @IsString()
  @Transform(HtmlSanitizer)
  benefits?: string;

  @IsOptional()
  @IsString()
  @Transform(HtmlSanitizer)
  orderNumber?: string;
}
