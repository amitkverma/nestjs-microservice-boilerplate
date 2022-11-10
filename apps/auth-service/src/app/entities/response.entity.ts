import { ApiProperty } from '@nestjs/swagger';

class ApiMeta {
    @ApiProperty()
    status: number

    @ApiProperty()
    message: string
}

export class ResponseEntity<T> {
    @ApiProperty()
    apiMeta: ApiMeta

    @ApiProperty()
    data: T
}

export interface IApiResponse<T>{
    apiMeta: {
        status: number,
        message: string
    },
    data: T
}