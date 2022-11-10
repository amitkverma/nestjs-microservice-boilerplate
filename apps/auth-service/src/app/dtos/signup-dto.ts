import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty()
  email: string;


  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @ApiProperty({required: false })
  name?: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;




    //   rolesId 
    //  companyId
}