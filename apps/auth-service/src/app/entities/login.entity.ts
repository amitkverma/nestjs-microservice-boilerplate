import { ApiProperty } from '@nestjs/swagger';

export class LoginEntity {
    @ApiProperty()
    accessToken: number

    @ApiProperty()
    refreshToken: string
}