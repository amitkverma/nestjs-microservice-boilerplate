import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsDateString,
    IsEmail,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator';
import { EmployeeStatus, Gender } from '@prisma/client';

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
    @IsOptional()
    @IsNotEmpty()
    @ApiProperty({ enum: EmployeeStatus })
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
    @ApiProperty({ enum: Gender })
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


    @IsNotEmpty()
    @ApiProperty()
    companyTitleId: string;

    @IsNotEmpty()
    @ApiProperty()
    teamId: string;
    
}


export class Employee extends CreateEmployeeDto {
    constructor({ 
        dob, email, firstName, gender,
        lastName, status, tenantId,
        hiredOn, isMarried, middleName,
        phone, picture, weddingAniversary }: CreateEmployeeDto) {
        super();
        this.dob = dob;
        this.email = email;
        this.firstName = firstName;
        this.gender = gender;
        this.tenantId = tenantId;
        this.lastName = lastName;
        this.status = status;
        this.isMarried = isMarried;
        this.middleName = middleName;
        this.hiredOn = hiredOn;
        this.phone = phone;
        this.picture = picture;
        this.weddingAniversary = weddingAniversary;
    }
}