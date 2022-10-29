import { Injectable } from '@nestjs/common';
import { IHealthConfig } from '@spotlyt-backend/data/interfaces';

@Injectable()
export class HealthService {
    private readonly config: IHealthConfig;

    constructor(private options: IHealthConfig){
        this.config = options;
    }

    getConfig(): IHealthConfig {
        return this.config
    }
}
