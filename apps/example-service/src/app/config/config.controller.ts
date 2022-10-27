import { Controller, Get, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NODE_ENV } from '@spotlyt-backend/data/constants';
import { IDBConfiguration } from '@spotlyt-backend/data/interfaces';

@Controller('config')
export class ConfigController {

    constructor(
        private readonly configService: ConfigService
    ){}

    @Get()
    findAll(): string {
        // get config from env
        const env: string = this.configService.get<string>(NODE_ENV);
        if (env === "development"){
            Logger.log(`Current ENV is ${env}`);
        }
        const port: string = this.configService.get<string>("PORT");
        // get config from file
        const dbConfig: IDBConfiguration = this.configService.get<IDBConfiguration>('database'); 
        Logger.log(`Database host ${dbConfig.host} and port ${dbConfig.port}` );
        return `Service is running at ${port}`;
    }

}
