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

const MAX_FILE_SIZE = 150 * 1024; // 150KB in bytes

@Injectable()
export class FileUploadInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();

    if (!request.isMultipart()) {
      throw new HttpException('Request must be multipart/form-data', HttpStatus.BAD_REQUEST);
    }

    const parts = request.parts();
    let fileData: any = null;
    const formData: any = {};

    // Process all parts
    for await (const part of parts) {
      if (part.type === 'file') {
        const file = part;
        const fileBuffer = await file.toBuffer();

        // Check file size
        if (fileBuffer.length > MAX_FILE_SIZE) {
          throw new HttpException(
            `File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024}KB`,
            HttpStatus.BAD_REQUEST
          );
        }

        // Check file type (must be webp)
        const mimetype = file.mimetype;
        if (mimetype !== 'image/webp') {
          throw new HttpException('File must be in WEBP format', HttpStatus.BAD_REQUEST);
        }

        // Validate image dimensions using 
        try {
          // Ensure we have a proper Buffer instance
          const buffer = Buffer.isBuffer(fileBuffer) ? fileBuffer : Buffer.from(fileBuffer);
          // Verify buffer has content
          if (!buffer || buffer.length === 0) {
            throw new HttpException('Empty file buffer', HttpStatus.BAD_REQUEST);
          }
          
          // Verify WEBP header (RIFF...WEBP)
          const header = buffer.toString('ascii', 0, 12);
          if (!header.startsWith('RIFF') || !header.includes('WEBP')) {
            throw new HttpException('Invalid WEBP file format - file header does not match WEBP signature', HttpStatus.BAD_REQUEST);
          }
        } catch (error: any) {
          console.error('error details:', {
            message: error?.message,
            code: error?.code,
            errno: error?.errno,
            stack: error?.stack?.substring(0, 500)
          });
          
          if (error instanceof HttpException) {
            throw error;
          }
          
          // Provide more specific error messages
          if (error?.message?.includes('Input buffer') || error?.code === 'ERR_INVALID_ARG_TYPE') {
            throw new HttpException('Invalid image file format or corrupted file', HttpStatus.BAD_REQUEST);
          }
          
          if (error?.message?.includes('unsupported image format') || error?.message?.includes('Unsupported image format')) {
            throw new HttpException('Unsupported image format. Please ensure the file is a valid WEBP image', HttpStatus.BAD_REQUEST);
          }
          
          throw new HttpException(
            `Failed to process image: ${error?.message || 'Unknown error'}`,
            HttpStatus.BAD_REQUEST
          );
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

    if (!fileData) {
      throw new HttpException('No file uploaded', HttpStatus.BAD_REQUEST);
    }

    // Attach file data and form data to request
    (request as any).fileData = fileData;
    (request as any).body = formData;

    return next.handle();
  }
}
