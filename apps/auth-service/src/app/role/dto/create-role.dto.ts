import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsEnum,
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class CreateRoleDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    description: string;

}
