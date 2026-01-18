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

  @IsOptional()
  @IsString()
  @Transform(HtmlSanitizer)
  shortDescription?: string;

  @IsOptional()
  @IsString()
  @Transform(HtmlSanitizer)
  fullDescription?: string;

  @IsOptional()
  @IsString()
  @Transform(HtmlSanitizer)
  manufacturer?: string;

  @IsOptional()
  @IsString()
  @Transform(HtmlSanitizer)
  certifications?: string;

  @IsOptional()
  @IsString()
  @Transform(HtmlSanitizer)
  imageUrl?: string;

  @IsString()
  @Transform(HtmlSanitizer)
  categorySlug: string;

  @IsOptional()
  specifications?: Record<string, any>;
}
