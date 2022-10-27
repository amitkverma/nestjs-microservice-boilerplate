import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreConfig } from '@spotlyt-backend/config';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [CoreConfig, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
