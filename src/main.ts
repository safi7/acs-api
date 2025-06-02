import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import mainConfig from './configs/main.config';
import * as fastify from 'fastify';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { join } from 'path';
import fastifyStatic from '@fastify/static';

async function bootstrap() {

  const serverOptions: fastify.FastifyServerOptions = {
    logger: false,
    bodyLimit: 10588576
  };
  const instance: fastify.FastifyInstance = fastify.default(serverOptions);
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

  await nestApp.listen(mainConfig.api_port);
}
bootstrap();
