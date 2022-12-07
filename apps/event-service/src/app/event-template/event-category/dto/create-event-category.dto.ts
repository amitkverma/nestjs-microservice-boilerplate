import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    IsUUID,
} from 'class-validator';

export class CreateEventCategoryDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;


    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    eventTypeId: string;
}
