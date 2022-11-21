
import { IsNumber, Min, IsOptional, IsString, } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationParams {
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(1)
  take?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  skip?: number;
}

export class SearchQueryParams {
  @IsOptional()
  @Type(() => String)
  @IsString()
  query?: string;
}