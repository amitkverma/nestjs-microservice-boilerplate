import { ApiProperty } from '@nestjs/swagger';
import { UserStatus } from '@prisma/client';
import {
    IsEnum,
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class UserStatusDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({})
    userId: string;

    @IsEnum(UserStatus)
    @IsNotEmpty()
    @ApiProperty({enum: UserStatus})
    status: UserStatus;

    
}
