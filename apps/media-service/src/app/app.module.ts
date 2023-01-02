import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CommonModule } from '@spotlyt-backend/common';
import { CoreConfig } from '@spotlyt-backend/config';
import { IHealthConfig } from '@spotlyt-backend/data/interfaces';
import { MulterExtendedModule } from '@spotlyt-backend/multer-extended';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { join } from 'path';

const health_config: IHealthConfig = {
  host: 'localhost',
  port: 3000
}

@Module({
  imports: [
    MulterExtendedModule.register({
      awsConfig: {
        accessKeyId: process.env.S3_ACCESS_ID,
        secretAccessKey: process.env.S3_SECRATE_KEY,
        region: process.env.REGION,
      },
      bucket: process.env.BUCKET_S3,
      basePath: process.env.S3_BASE_PATH,
      fileSize: 10 * 1024 * 1024, // 10 MB
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', '..', '..', 'public')
    }),
    CoreConfig, ConfigModule, CommonModule.register({ health: health_config })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }