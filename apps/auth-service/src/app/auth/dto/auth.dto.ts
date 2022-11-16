import { ApiProperty } from '@nestjs/swagger';
import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    password: string;

}


export class ResetPasswordDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    userId: string;


    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    newPassword: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    oldPassword: string;

}


export class ChangePasswordDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    newPassword: string;
}
