import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NODE_ENV } from '@spotlyt-backend/data/constants';
import { Environment } from '@spotlyt-backend/data/enums';

@Injectable()
export class AppConfig {
  constructor(private configService: ConfigService) {}

  get isProduction(): boolean {
    return this.configService.get<string>(NODE_ENV) === Environment.Production;
  }
}
