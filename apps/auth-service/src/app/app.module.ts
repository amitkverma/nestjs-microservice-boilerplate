import { Module } from '@nestjs/common';
import { CommonModule } from '@spotlyt-backend/common';
import { CoreConfig } from '@spotlyt-backend/config';
import { IHealthConfig } from '@spotlyt-backend/data/interfaces';
import { PrismaModule } from '@spotlyt-backend/database';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TenantModule } from './tenant/tenant.module';
import { RoleModule } from './role/role.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

const health_config = {
  host: process.env.HOST,
  port: parseInt(process.env.AUTH_SERVICE_PORT)
} as IHealthConfig;

@Module({
  imports: [CoreConfig, 
    CommonModule.register({ health: health_config }),
    PrismaModule,
    TenantModule,
    RoleModule,
    AuthModule,
    UserModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
