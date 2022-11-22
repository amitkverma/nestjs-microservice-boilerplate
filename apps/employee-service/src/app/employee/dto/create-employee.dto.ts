import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsDateString,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsObject,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';
import { EmployeeStatus, Gender } from '@prisma/client';


export class CompanyTitleDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;
}

export class TeamDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @IsOptional()
    @ApiProperty()
    description?: string;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    isRemote?: boolean;

}


export class CreateEmployeeDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    firstName: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    middleName?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    lastName: string;

    @IsEnum(EmployeeStatus)
    @IsNotEmpty()
    @ApiProperty({enum: EmployeeStatus})
    status: EmployeeStatus;

    @IsEmail()
    @ApiProperty()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsOptional()
    @ApiProperty()
    phone?: string;


    @IsEnum(Gender)
    @IsNotEmpty()
    @ApiProperty({enum: Gender})
    gender: Gender;


    @IsDateString()
    @IsOptional()
    @ApiProperty()
    dob: Date;


    @IsString()
    @IsOptional()
    @ApiProperty()
    picture?: string;


    @IsDateString()
    @IsOptional()
    @ApiProperty()
    hiredOn?: Date;

    @IsBoolean()
    @IsOptional()
    @ApiProperty()
    isMarried?: boolean;

    @IsDateString()
    @IsOptional()
    @ApiProperty()
    weddingAniversary?: Date;


    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    tenantId: string;

    @IsObject()
    @ApiProperty({ type: TeamDto })
    team: TeamDto

    @IsObject()
    @ApiProperty({ type: CompanyTitleDto })
    companyTitle: CompanyTitleDto
}
