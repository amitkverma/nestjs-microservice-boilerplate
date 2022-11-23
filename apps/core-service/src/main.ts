/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApplicationReadiness, initWinston, secureApplication } from '@spotlyt-backend/common';
import * as swStats from 'swagger-stats';
import { PrismaExceptionFilters } from '@spotlyt-backend/common'

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app_name = "core_service";

  const app = await NestFactory.create(AppModule, {
    logger: initWinston(app_name),
    cors: {
      allowedHeaders: "*",
      origin: '*'
    }
  });
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }));

  app.useGlobalFilters(new PrismaExceptionFilters.AllExceptionsFilter());
  secureApplication(app);

  const configPrefix = 'status';

  const config = new DocumentBuilder()
    .setTitle('Core Service')
    .setDescription('The core API description')
    .setVersion('1.0')
    .addTag('core')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/${configPrefix}/docs`, app, document);
  app.use(swStats.getMiddleware({ swaggerSpec: (document), uriPath: `/${configPrefix}/stats` }));


  const configService = app.get(ConfigService);
  const port = configService.get<number>('CORE_PORT', 3000);
  await app.listen(port);
  ApplicationReadiness.getInstance().isReady = true;

  const url = await app.getUrl();
  Logger.log(`🚀 Application is running on port: ${url}`);
}

bootstrap();
