import { DynamicModule, Module } from '@nestjs/common';
import { IHealthConfig } from '@spotlyt-backend/data/interfaces';
import { HealthModule } from './health/health.module';
import { ReadinessModule } from './readiness/readiness.module';

type CommonOptions = {
    health: IHealthConfig;
}

@Module({
  imports: [ReadinessModule]
})
export class CommonModule {
  static register(options: CommonOptions): DynamicModule {
    return {
      module: CommonModule,
      imports: [HealthModule.register(options.health), ReadinessModule],
      exports: [HealthModule, ReadinessModule]
    }
  }
}