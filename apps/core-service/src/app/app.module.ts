import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CoreConfig } from '@spotlyt-backend/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [CoreConfig, ConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
