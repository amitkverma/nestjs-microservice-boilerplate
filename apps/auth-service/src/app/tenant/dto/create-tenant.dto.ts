import { Status } from "@prisma/client";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateTenantDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(5)
    name: string;

    @IsEnum(Status)
    status: Status = Status.Inactive;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    @MinLength(5)
    address?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    city?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    state?: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    country?: string;

    @IsNumber()
    @IsOptional()
    @IsNotEmpty()
    zip?: string;

    @IsEmail()
    @IsNotEmpty()
    primaryContactEmail: string;

    @IsString()
    allowedDomain: string;

    @IsString()
    tenantType: string;


}
