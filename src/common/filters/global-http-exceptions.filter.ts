import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch(HttpException)
export class GlobalHttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<FastifyReply>();
    const status = exception.getStatus();
    let message = exception.message;

    switch (message) {
      case 'Forbidden resource':
        message = 'FORBIDDEN_RESOURCE';
        break;
      case 'Bad Request Exception':
        message = 'BAD_REQUEST';
        break;
    }

    response.status(status).send({
      statusCode: status,
      message
    });
  }
}
