import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { RoleType } from '@prisma/client';

export class CreateRoleDto {


  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;


  @IsNotEmpty()
  @IsEnum(RoleType)
  @ApiProperty({ enum: RoleType })
  roleType: RoleType;


  @IsArray()
  @ApiProperty()
  permissions: string[]


}