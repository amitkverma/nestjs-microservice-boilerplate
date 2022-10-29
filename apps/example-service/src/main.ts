/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { initWinston } from '@spotlyt-backend/common';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as swStats from 'swagger-stats';
import { ApplicationReadiness, secureApplication } from '@spotlyt-backend/common';

async function bootstrap() {
  const app_name = "example_service";

  const app = await NestFactory.create(AppModule, {
    logger: initWinston(app_name)
  });

  secureApplication(app);
 
  const globalPrefix = 'example';
  app.setGlobalPrefix(globalPrefix);

  const config = new DocumentBuilder()
    .setTitle('Example Service')
    .setDescription('The example API description')
    .setVersion('1.0')
    .addTag('example')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/${globalPrefix}/docs`, app, document);
  app.use(swStats.getMiddleware({swaggerSpec: (document), uriPath: `/${globalPrefix}/stats` }));


  const configService = app.get(ConfigService);
  const port = configService.get<number>('EXAMPLE_PORT', 3333);
  await app.listen(port);
  ApplicationReadiness.getInstance().isReady = true;

  const url = await app.getUrl();
  Logger.log(`🚀 Application is running on port: ${url}/${globalPrefix}`);

}

(async (): Promise<void> => {
  await bootstrap();
})().catch((error: Error) => {
  Logger.error(`Nest application error: ${error.message}`);
});