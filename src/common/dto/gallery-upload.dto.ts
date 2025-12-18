import { IsOptional, IsString, MaxLength } from 'class-validator';

export class GalleryUploadDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  description?: string;

  @IsOptional()
  @IsString()
  title?: string;
}
