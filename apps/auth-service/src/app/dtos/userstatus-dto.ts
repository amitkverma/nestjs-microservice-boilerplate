import { ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { Status } from '@prisma/client';

export class UserStatusChangeDto {
    @IsNotEmpty()
    @IsEnum(Status)
    @ApiProperty({enum: Status, description: `Accepted Value: ${JSON.stringify(Status)}`})
    status: Status;


    @IsNotEmpty()
    @IsString()
    @ApiProperty()
    email: string;
}