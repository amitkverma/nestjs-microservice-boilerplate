import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
    IsUUID,
} from 'class-validator';


export class CreateEventAudianceDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    teamName: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    eventId: string;

}
