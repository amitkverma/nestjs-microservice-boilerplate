import { Module } from '@nestjs/common';
import { RolesController } from './roles/roles.controller';
import { RolesService } from './roles/roles.service';
import { PrismaService } from '../prisma.service';


@Module({
  controllers: [RolesController],
  providers: [RolesService, PrismaService]
})
export class RolesModule {}
