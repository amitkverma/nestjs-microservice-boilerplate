import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NODE_ENV } from '../constants';
import { Environment } from '../enums';

@Injectable()
export class AppConfig {
  constructor(private configService: ConfigService) {}

  get isProduction(): boolean {
    return this.configService.get<string>(NODE_ENV) === Environment.Production;
  }
}
