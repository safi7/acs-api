"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileUploadInterceptor = void 0;
const common_1 = require("@nestjs/common");
const sharp = require("sharp");
const MAX_FILE_SIZE = 150 * 1024;
const MAX_WIDTH = 2000;
const MAX_HEIGHT = 2000;
let FileUploadInterceptor = class FileUploadInterceptor {
    async intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        if (!request.isMultipart()) {
            throw new common_1.HttpException('Request must be multipart/form-data', common_1.HttpStatus.BAD_REQUEST);
        }
        const parts = request.parts();
        let fileData = null;
        const formData = {};
        for await (const part of parts) {
            if (part.type === 'file') {
                const file = part;
                const fileBuffer = await file.toBuffer();
                if (fileBuffer.length > MAX_FILE_SIZE) {
                    throw new common_1.HttpException(`File size exceeds maximum allowed size of ${MAX_FILE_SIZE / 1024}KB`, common_1.HttpStatus.BAD_REQUEST);
                }
                const mimetype = file.mimetype;
                if (mimetype !== 'image/webp') {
                    throw new common_1.HttpException('File must be in WEBP format', common_1.HttpStatus.BAD_REQUEST);
                }
                try {
                    const buffer = Buffer.isBuffer(fileBuffer) ? fileBuffer : Buffer.from(fileBuffer);
                    if (!buffer || buffer.length === 0) {
                        throw new common_1.HttpException('Empty file buffer', common_1.HttpStatus.BAD_REQUEST);
                    }
                    const header = buffer.toString('ascii', 0, 12);
                    if (!header.startsWith('RIFF') || !header.includes('WEBP')) {
                        throw new common_1.HttpException('Invalid WEBP file format - file header does not match WEBP signature', common_1.HttpStatus.BAD_REQUEST);
                    }
                    const metadata = await sharp(buffer).metadata();
                    if (!metadata.width || !metadata.height) {
                        throw new common_1.HttpException('Invalid image file - could not read dimensions', common_1.HttpStatus.BAD_REQUEST);
                    }
                    if (metadata.width > MAX_WIDTH || metadata.height > MAX_HEIGHT) {
                        throw new common_1.HttpException(`Image dimensions (${metadata.width}x${metadata.height}px) exceed maximum allowed size of ${MAX_WIDTH}x${MAX_HEIGHT}px`, common_1.HttpStatus.BAD_REQUEST);
                    }
                }
                catch (error) {
                    console.error('Sharp error details:', {
                        message: error?.message,
                        code: error?.code,
                        errno: error?.errno,
                        stack: error?.stack?.substring(0, 500)
                    });
                    if (error instanceof common_1.HttpException) {
                        throw error;
                    }
                    if (error?.message?.includes('Input buffer') || error?.code === 'ERR_INVALID_ARG_TYPE') {
                        throw new common_1.HttpException('Invalid image file format or corrupted file', common_1.HttpStatus.BAD_REQUEST);
                    }
                    if (error?.message?.includes('unsupported image format') || error?.message?.includes('Unsupported image format')) {
                        throw new common_1.HttpException('Unsupported image format. Please ensure the file is a valid WEBP image', common_1.HttpStatus.BAD_REQUEST);
                    }
                    throw new common_1.HttpException(`Failed to process image: ${error?.message || 'Unknown error'}`, common_1.HttpStatus.BAD_REQUEST);
                }
                fileData = {
                    buffer: fileBuffer,
                    filename: file.filename,
                    mimetype: file.mimetype,
                };
            }
            else if (part.type === 'field') {
                formData[part.fieldname] = part.value;
            }
        }
        if (!fileData) {
            throw new common_1.HttpException('No file uploaded', common_1.HttpStatus.BAD_REQUEST);
        }
        request.fileData = fileData;
        request.body = formData;
        return next.handle();
    }
};
exports.FileUploadInterceptor = FileUploadInterceptor;
exports.FileUploadInterceptor = FileUploadInterceptor = __decorate([
    (0, common_1.Injectable)()
], FileUploadInterceptor);
//# sourceMappingURL=file-upload.interceptor.js.map