import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
} from 'class-validator';
export class CreateEventMediaDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;


    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    mimeType: string;



    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    key: string;


    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    url: string;


    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    eventId: string;

}
