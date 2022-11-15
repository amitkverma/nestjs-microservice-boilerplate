import { ApiProperty } from '@nestjs/swagger';



export class UserEntity {
    @ApiProperty()
    email: string

    @ApiProperty()
    id: number

    @ApiProperty({required: false})
    name?: string
}