import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { PrismaModule } from '@spotlyt-backend/database';

@Module({
  imports: [PrismaModule],
  controllers: [CompanyController],
  providers: [CompanyService]
})
export class CompanyModule { }
