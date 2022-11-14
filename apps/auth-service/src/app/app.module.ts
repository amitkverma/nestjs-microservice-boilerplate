import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthenticationModule } from './authentication/authentication.module';
import { RolesModule } from './roles/roles.module';
import { TenantModule } from './tenant/tenant.module';

@Module({
  imports: [AuthenticationModule, RolesModule, TenantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
