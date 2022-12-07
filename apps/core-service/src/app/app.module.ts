import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommonModule } from '@spotlyt-backend/common';
import { CoreConfig } from '@spotlyt-backend/config';
import { IHealthConfig } from '@spotlyt-backend/data/interfaces';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EmployeeModule } from './employee/employee.module';
import { CompanyModule } from './company/company.module';
import { TeamModule } from './team/team.module';

const health_config: IHealthConfig = {
  host: 'localhost',
  port: 3000
}


@Module({
  imports: [CoreConfig, ConfigModule, CommonModule.register({ health: health_config }), EmployeeModule, CompanyModule, TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
