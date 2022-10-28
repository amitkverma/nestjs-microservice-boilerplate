import { Controller, Get, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiCreatedResponse } from '@nestjs/swagger';
import { NODE_ENV } from '@spotlyt-backend/data/constants';
import { IDBConfiguration } from '@spotlyt-backend/data/interfaces';
import { ConfigDto } from './config.dto';

@Controller('config')
export class ConfigController {

    private readonly logger = new Logger(ConfigController.name);
    constructor(
        private readonly configService: ConfigService
    ){}

    @ApiCreatedResponse({ description: "Get config info" })
    @Get()
    findAll(): ConfigDto {
        // get config from env
        const env: string = this.configService.get<string>(NODE_ENV);
        if (env === "development"){
            this.logger.log(`Current ENV is ${env}`);
        }
        // const port: string = this.configService.get<string>("PORT");
        // get config from file
        const dbConfig: IDBConfiguration = this.configService.get<IDBConfiguration>('database'); 
        this.logger.log(`Database host ${dbConfig.host} and port ${dbConfig.port}` );
        return dbConfig as ConfigDto;
    }

}
