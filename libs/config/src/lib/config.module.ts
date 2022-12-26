import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomConfigModule } from './config/custom-config.module';
import databaseConfig from './config/database.config';
import { validate } from './config/env.validation';
import s3Config from './config/s3.config';

@Module({
  imports: [ConfigModule.forRoot(
    {
      isGlobal: true,
      load: [databaseConfig, s3Config],
      validate: validate,
    }   
  ), CustomConfigModule],
  controllers: [],
  providers: [],
  exports: [ConfigModule.forRoot(
    {
      isGlobal: true,
      load: [databaseConfig, s3Config],
      validate: validate,
    }   
  ), CustomConfigModule],
})
export class CoreConfig {}
