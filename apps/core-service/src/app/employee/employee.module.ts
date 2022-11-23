import { Module } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { EmployeeController } from './employee.controller';
import { PrismaModule } from '@spotlyt-backend/database';
import { MulterModule } from '@nestjs/platform-express';


@Module({
  imports: [PrismaModule, MulterModule.register({
    dest: './upload',
  })],
  controllers: [EmployeeController],
  providers: [EmployeeService]
})
export class EmployeeModule { }
