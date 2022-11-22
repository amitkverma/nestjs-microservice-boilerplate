import { Module } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { TenantController } from './tenant.controller';
import { PrismaModule } from '@spotlyt-backend/database';

@Module({
  imports: [PrismaModule],
  controllers: [TenantController],
  providers: [TenantService]
})
export class TenantModule { }
