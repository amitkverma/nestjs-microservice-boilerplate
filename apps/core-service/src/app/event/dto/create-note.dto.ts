import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    IsUUID,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';


export class CreateEventNoteDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    text: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    eventId: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    userId: string;
}

export class UpdateEventNoteDto extends PartialType(CreateEventNoteDto) {}
