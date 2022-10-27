import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CustomConfigModule } from './config/custom-config.module';
import databaseConfig from './config/database.config';
import { validate } from './config/env.validation';

@Module({
  imports: [ConfigModule.forRoot(
    {
      isGlobal: true,
      load: [databaseConfig],
      validate: validate,
    }   
  ), CustomConfigModule],
  controllers: [],
  providers: [],
  exports: [ConfigModule.forRoot(
    {
      isGlobal: true,
      load: [databaseConfig],
      validate: validate,
    }   
  ), CustomConfigModule],
})
export class CoreConfig {}
