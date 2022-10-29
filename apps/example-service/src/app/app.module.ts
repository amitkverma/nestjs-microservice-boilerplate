import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreConfig } from '@spotlyt-backend/config';
import { ConfigModule } from './config/config.module';
import { CommonModule } from '@spotlyt-backend/common';
import { IHealthConfig } from '@spotlyt-backend/data/interfaces';

const health_config: IHealthConfig = {
  host: 'localhost',
  port: 3333
}

@Module({
  imports: [CoreConfig, ConfigModule, CommonModule.register({ health: health_config })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
