import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';

export class RoleUpdateDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty()
    roleId: number;


    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty()
    email: string;
}