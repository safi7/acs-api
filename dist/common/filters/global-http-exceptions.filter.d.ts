import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class GlobalHttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
