
import { IsNumber, Min, IsOptional, IsString, } from 'class-validator';
import { ApiProperty, refs } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class PaginationParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  @ApiProperty({
    name: 'take',
    default: 1
  })
  take?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @ApiProperty({
    name: 'skip',
    default: 0
  })
  skip?: number;
}

export class SearchQueryParams {
  @IsOptional()
  @Type(() => String)
  @IsString()
  @ApiProperty({
    name: 'query',
    default: '',
    required: false
  })
  query?: string;
}