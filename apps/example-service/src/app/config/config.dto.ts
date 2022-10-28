import { ApiProperty } from "@nestjs/swagger";

export class ConfigDto {
    @ApiProperty()
    host: string;
  
    @ApiProperty()
    port: number;
  }