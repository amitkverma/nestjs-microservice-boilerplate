import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
// import { Gender } from '@spotlyt-backend/data/enums';
import { Gender } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;


  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({required: false})
  middleName?: string;


  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  designation: string;


  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  photoUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @IsDateString()
  dob: Date;


  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;


  @IsString()
  @IsNotEmpty()
  @IsEnum(Gender)
  @ApiProperty()
  gender: Gender;




    //   rolesId 
    //  companyId
}