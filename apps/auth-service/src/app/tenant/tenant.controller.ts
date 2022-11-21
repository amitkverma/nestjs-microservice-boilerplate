import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationParams, SearchQueryParams } from '@spotlyt-backend/data/dtos';

@ApiTags('tenant')
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) { }

  @Get('count')
  count(@Query() { query }: SearchQueryParams) {
    return this.tenantService.count({
      name: {
        contains: query ?? '',
        mode: 'insensitive'
      }
    });
  }

  @Post()
  create(@Body() createTenantDto: CreateTenantDto) {
    return this.tenantService.create(createTenantDto);
  }

  @Get()
  findAll(@Query() { take, skip }: PaginationParams, @Query() { query }: SearchQueryParams) {
    return this.tenantService.findAll({
      take: +take, skip: +skip, where: {
        name: {
          contains: query ?? '',
          mode: 'insensitive'
        }
      }
    });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tenantService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTenantDto: UpdateTenantDto) {
    return this.tenantService.update(id, updateTenantDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tenantService.remove(id);
  }
}
