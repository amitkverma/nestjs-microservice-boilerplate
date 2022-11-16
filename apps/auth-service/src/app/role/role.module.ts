import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaModule } from '@spotlyt-backend/database';

@Module({
  imports: [PrismaModule],
  controllers: [RoleController],
  providers: [RoleService]
})
export class RoleModule {}
