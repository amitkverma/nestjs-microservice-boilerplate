import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsDateString,
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';

export class CreateUserDto {

    @IsString()
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({})
    email: string;


    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    firstName: string;

    @IsString()
    @IsOptional()
    @ApiProperty({required: false})
    lastName: string;

    @IsString()
    @IsOptional()
    @ApiProperty({required: false})
    middleName: string;


    @IsString()
    @IsOptional()
    @ApiProperty({required: false})
    phone: string;

    @IsString()
    @IsOptional()
    @ApiProperty({required: false})
    phoneExt: string;


    @IsString()
    @IsOptional()
    @ApiProperty({required: false})
    resetPasswordhash: string;


    @IsDateString()
    @IsOptional()
    @ApiProperty({required: false})
    resetPasswordExpire: Date;


    @IsBoolean()
    @IsOptional()
    @ApiProperty({required: false})
    resetPasswordActive: boolean;


    @IsString()
    @IsOptional()
    @ApiProperty()
    photoUrl: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    employeeId: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    roleId: string;
    
    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    tenantId: string;
}
