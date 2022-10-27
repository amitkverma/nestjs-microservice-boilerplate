/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { initWinston } from '@spotlyt-backend/common';
import { AppModule } from './app/app.module';


async function bootstrap() {
  const app_name = "example_service";

  const app = await NestFactory.create(AppModule, {
    logger: initWinston(app_name)
  });
 
  const globalPrefix = 'example';
  app.setGlobalPrefix(globalPrefix);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('EXAMPLE_PORT', 3333);
  await app.listen(port);


  const url = await app.getUrl();
  Logger.log(`🚀 Application is running on port: ${url}/${globalPrefix}`);
}

(async (): Promise<void> => {
  await bootstrap();
})().catch((error: Error) => {
  Logger.error(`Nest application error: ${error.message}`);
});