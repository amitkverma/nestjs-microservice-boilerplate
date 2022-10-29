import { DynamicModule, Module } from '@nestjs/common';
import { TerminusModule } from '@nestjs/terminus';
import { HealthController } from './health.controller';
import { HttpModule } from '@nestjs/axios';
import { HealthService } from './health.service';
import { IHealthConfig } from '@spotlyt-backend/data/interfaces';

@Module({})
export class HealthModule {
  static register(options: IHealthConfig): DynamicModule {
    return {
      module: HealthModule,
      controllers: [HealthController],
      providers: [
        {
          provide: HealthService,
          useValue: new HealthService(options),
        }
      ],
      imports: [TerminusModule, HttpModule],
    }
  }
}