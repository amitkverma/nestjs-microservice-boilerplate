import { ApiProperty } from '@nestjs/swagger';
import {
    IsBoolean,
    IsEnum,
    IsNotEmpty,
    IsOptional,
    IsUUID,
} from 'class-validator';
import { ParticipantType } from '@prisma/client'

export class CreateEventParticipantDto {
    @IsBoolean()
    @IsOptional()
    @ApiProperty({ default: true })
    isGuest: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ default: false })
    hasJoined: boolean;

    @IsBoolean()
    @IsOptional()
    @ApiProperty({ default: false })
    isPerforming: boolean;

    @IsEnum(ParticipantType)
    @ApiProperty({ default: ParticipantType.Guest, enum: ParticipantType })
    participantType: ParticipantType;



    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    eventId: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty()
    userId: string;

}

