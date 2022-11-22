import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  controllers: [],
  providers: [],
  exports: [PrismaModule],
  imports: [PrismaModule],
})
export class DatabaseModule {}
