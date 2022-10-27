import { Module } from '@nestjs/common';
import { AppConfig } from './app.config';

@Module({
  providers: [AppConfig],
})
export class CustomConfigModule {}
