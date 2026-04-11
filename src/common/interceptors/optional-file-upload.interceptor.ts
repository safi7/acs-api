import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';

const MAX_FILE_SIZE = 150 * 1024; // 150KB

@Injectable()
export class OptionalFileUploadInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    if (!request.isMultipart()) {
      throw new HttpException('Request must be multipart/form-data', HttpStatus.BAD_REQUEST);
    }

    const parts = request.parts();
    let fileData: any = null;
    const formData: any = {};

    for await (const part of parts) {
      if (part.type === 'file') {
        const file = part;
        const fileBuffer = await file.toBuffer();

        // Skip empty file fields (no file selected)
        if (fileBuffer.length === 0) continue;

        if (fileBuffer.length > MAX_FILE_SIZE) {
          throw new HttpException(
            `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024}KB`,
            HttpStatus.BAD_REQUEST
          );
        }

        if (file.mimetype !== 'image/webp') {
          throw new HttpException('File must be in WEBP format', HttpStatus.BAD_REQUEST);
        }

        const buffer = Buffer.isBuffer(fileBuffer) ? fileBuffer : Buffer.from(fileBuffer);
        const header = buffer.toString('ascii', 0, 12);
        if (!header.startsWith('RIFF') || !header.includes('WEBP')) {
          throw new HttpException('Invalid WEBP file format', HttpStatus.BAD_REQUEST);
        }

        fileData = {
          buffer: fileBuffer,
          filename: file.filename,
          mimetype: file.mimetype,
        };
      } else if (part.type === 'field') {
        formData[part.fieldname] = part.value;
      }
    }

    // File is optional — don't throw if missing
    (request as any).fileData = fileData;
    (request as any).body = formData;

    return next.handle();
  }
}
