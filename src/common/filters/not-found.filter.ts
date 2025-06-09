// filters/not-found.filter.ts
import { ArgumentsHost, Catch, ExceptionFilter, NotFoundException } from '@nestjs/common';
import { FastifyReply } from 'fastify';

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
  catch(exception: NotFoundException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();

    const response = ctx.getResponse<FastifyReply>();

    // Handle the 404 error here
    response.status(404).send({ message: 'Not Found' });
  }
}
