import { Controller, Get } from '@nestjs/common';
import { HealthCheckService, HttpHealthIndicator, HealthCheck } from '@nestjs/terminus';
import { IHealthConfig } from '@spotlyt-backend/data/interfaces';
import { HealthService } from './health.service';

@Controller('status/health')
export class HealthController {
  constructor(
    private healthService: HealthService,
    private health: HealthCheckService,
    private http: HttpHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    const config : IHealthConfig = this.healthService.getConfig();
    const path: string = config?.routePath ?? "";
    return this.health.check([
      () => this.http.pingCheck('api', `http://${config.host}:${config.port}/${path}`),
    ]);
  }
}