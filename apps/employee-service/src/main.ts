import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { initWinston } from '@spotlyt-backend/common';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as swStats from 'swagger-stats';
import { ApplicationReadiness, secureApplication } from '@spotlyt-backend/common';
import { AUTHENTICATION_FORMAT, AUTHENTICATION_SCHEME } from '@spotlyt-backend/data/constants';

async function bootstrap() {
  const app_name = "employee_service";

  const app = await NestFactory.create(AppModule, {
    logger: initWinston(app_name),
    cors: {
     allowedHeaders:"*",
     origin: '*'
    }
  });
  app.useGlobalPipes(new ValidationPipe({
   whitelist: true
 }));

  secureApplication(app);
 
  const configPrefix = 'status';

  const configService = app.get(ConfigService);

  const config = new DocumentBuilder()
    .setTitle('Employee Service')
    .setDescription('Employee Service Api')
    .setVersion('1.0')
    .addTag('Employees')
    .addBearerAuth(
     { type: 'http', scheme: AUTHENTICATION_SCHEME, bearerFormat: AUTHENTICATION_FORMAT },
     'jwt',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`/${configPrefix}/docs`, app, document);
  app.use(swStats.getMiddleware({swaggerSpec: (document), uriPath: `/${configPrefix}/stats` }));


  const port = configService.get<number>('EMPL_SERVICE_PORT', 7002);
  await app.listen(port);
  ApplicationReadiness.getInstance().isReady = true;

  const url = await app.getUrl();
  Logger.log(`🚀 Application is running on port: ${url}`);

}

(async (): Promise<void> => {
  await bootstrap();
})().catch((error: Error) => {
  Logger.error(`Nest application error: ${error.message}`);
});
