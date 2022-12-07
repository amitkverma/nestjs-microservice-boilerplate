import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@spotlyt-backend/common';
import { CoreConfig } from '@spotlyt-backend/config';
import { IHealthConfig } from '@spotlyt-backend/data/interfaces';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventTemplateModule } from './event-template/event-template.module';
import { EventModule } from './event/event.module';

const health_config: IHealthConfig = {
  host: 'localhost',
  port: 3000
}


@Module({
  imports: [CoreConfig, ConfigModule, CommonModule.register({ health: health_config }), EventTemplateModule, EventModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
