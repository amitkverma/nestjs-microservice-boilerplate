import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString,
} from 'class-validator';
import { Status } from '@prisma/client';


export class AuthClientDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    secrate: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ default: '5m' })
    accessTokenExpiration: string;


    @IsString()
    @IsNotEmpty()
    @ApiProperty({ default: '7d' })
    refreshTokenExpiration: string;
}

export class CreateTenantDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ required: false })
    website: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ required: false })
    logoUrl: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ required: false })
    address: string;

    @IsEnum(Status)
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ required: false, enum: Status })
    status: Status;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ required: false })
    city: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ required: false })
    state: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty({ required: false })
    zip: string;

    @IsObject()
    @ApiProperty({ type: AuthClientDto })
    auth: AuthClientDto
}

