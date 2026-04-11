import { IsBoolean, IsOptional, IsString, MaxLength } from 'class-validator';

export class NewsCreateDto {
  @IsString()
  @MaxLength(200)
  title: string;

  @IsString()
  content: string;

  @IsString()
  keywords: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}

export class NewsUpdateDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  title?: string;

  @IsOptional()
  @IsString()
  content?: string;

  @IsOptional()
  @IsString()
  keywords?: string;

  @IsOptional()
  @IsBoolean()
  isPublished?: boolean;
}
