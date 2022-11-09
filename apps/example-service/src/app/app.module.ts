import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoreConfig } from '@spotlyt-backend/config';
import { ConfigModule } from './config/config.module';
import { CommonModule } from '@spotlyt-backend/common';
import { IHealthConfig } from '@spotlyt-backend/data/interfaces';
import { UserModule } from './user/user.module';
import { PrismaService } from './prisma.service';

const health_config: IHealthConfig = {
  host: 'localhost',
  port: 3333
}

@Module({
  imports: [CoreConfig, ConfigModule, CommonModule.register({ health: health_config }), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
