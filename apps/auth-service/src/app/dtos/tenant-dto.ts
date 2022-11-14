import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Status } from '@prisma/client';

export class TenantDto {
  

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsEnum(Status)
  @ApiProperty({enum: Status})
  status: Status;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({required: false})
  address?: string;
  
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({required: false})
  state?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({required: false})
  zip?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({required: false})
  city?: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @ApiProperty({required: false})
  country?: string;


  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  primaryContactEmail: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  allowedDomain: string;


  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  tenantType: string;


  

  
}