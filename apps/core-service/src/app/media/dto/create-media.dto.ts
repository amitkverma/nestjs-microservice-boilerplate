import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';


class MediaItem {
    @IsString()
    @IsOptional()
    @ApiProperty()
    name: string;


    @IsString()
    @IsOptional()
    @ApiProperty()
    key: string;


    @IsString()
    @IsOptional()
    @ApiProperty()
    mimeType: string;


    @IsString()
    @IsOptional()
    @ApiProperty()
    url: string;
}


export class CreateMediaDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    eventId: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    @ApiProperty()
    employeeId: string;

    @IsArray()
    @IsNotEmpty()
    @ApiProperty({ type: Array<MediaItem> })
    medias: MediaItem[];

}
