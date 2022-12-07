import { ApiProperty } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';
import {
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    IsDateString,
} from 'class-validator';

export class CreateEventDto {
    @IsString()
    @IsOptional()
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


    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    eventTemplateId: string;

    @IsDateString()
    @IsOptional()
    @ApiProperty()
    startAt: Date;


    @IsString()
    @IsOptional()
    @ApiProperty()
    location: string;


    @IsDateString()
    @IsOptional()
    @ApiProperty()
    endAt: Date;


    @IsBoolean()
    @IsOptional()
    @ApiProperty({ type: Boolean, default: true })
    isActive: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ type: Boolean, default: true })
    isNotificationOn: boolean;


    @IsBoolean()
    @IsOptional()
    @ApiProperty({ type: Boolean, default: true })
    allowPerformers: boolean;


    @IsBoolean()
    @IsOptional()
    @ApiProperty({ type: Boolean, default: true })
    allowRewards: boolean;


    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    tenantId: string;

}
