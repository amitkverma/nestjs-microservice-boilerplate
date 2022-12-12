import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    IsUUID,
} from 'class-validator';

export class CreateEventAttachmentDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;


    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    mimeTpe: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    key: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    url: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    eventId: string;
    
}

