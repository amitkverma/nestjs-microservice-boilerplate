import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
    IsArray,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';
export class CreateEventTemplateDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    description: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    image: string;


    @IsString()
    @IsOptional()
    @ApiProperty()
    instruction: string;


    @IsString()
    @IsOptional()
    @ApiProperty()
    howTos: string;


    @IsArray()
    @IsOptional()
    @ApiProperty({ type: Array })
    agenda: Prisma.JsonArray;


    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    eventCategoryId: string;
}
