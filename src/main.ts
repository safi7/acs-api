import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mainConfig from './configs/main.config';
import * as fastify from 'fastify';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { join } from 'path';
import fastifyStatic from '@fastify/static';
import fastifyMultipart from '@fastify/multipart';
import { GlobalHttpExceptionFilter } from './common/filters/global-http-exceptions.filter';
import { NotFoundFilter } from './common/filters/not-found.filter';
import { Logger, NestInterceptor } from '@nestjs/common';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { ErrorsInterceptor } from './common/interceptors/errors.interceptor';

async function bootstrap() {
  const serverOptions: fastify.FastifyServerOptions = {
    logger: false,
    bodyLimit: 10588576
  };
  const instance: fastify.FastifyInstance = fastify.default(serverOptions);
  
  // Register multipart plugin for file uploads
  await instance.register(fastifyMultipart, {
    limits: {
      fileSize: 200 * 1024, // 200KB limit (slightly higher than 150KB to account for overhead)
    },
  });
  
  const nestApp = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(instance as any));

  nestApp.setGlobalPrefix('api');

  nestApp.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
  });

  await nestApp.register(fastifyStatic, {
    root: join(__dirname, '..', 'media'),
    prefix: '/media/'
  });

  nestApp.useGlobalFilters(...[new GlobalHttpExceptionFilter(), new NotFoundFilter()]);

  const logger = new Logger();
  const globalInterceptors: NestInterceptor[] = [new TransformInterceptor(), new ErrorsInterceptor(logger)];

  nestApp.useGlobalInterceptors(...globalInterceptors);

  const port = process.env.PORT || mainConfig.api_port || 3000;
  console.log(`✅ Starting server on port ${port}`);
  await nestApp.listen(port, '0.0.0.0');
}
bootstrap();
