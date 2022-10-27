import { Controller, Get, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IDBConfiguration } from '../interfaces/database.interface';

@Controller('config')
export class ConfigController {

    constructor(
        private readonly configService: ConfigService
    ){}

    @Get()
    findAll(): string {
        // get config from env
        const port: string = this.configService.get<string>("PORT");
        // get config from file
        const dbConfig: IDBConfiguration = this.configService.get<IDBConfiguration>('database'); 
        Logger.log(`Database host ${dbConfig.host} and port ${dbConfig.port}` );
        return `Service is running at ${port}`;
    }

}
