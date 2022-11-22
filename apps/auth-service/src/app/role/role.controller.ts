import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationParams, SearchQueryParams } from '@spotlyt-backend/data/dtos';

@ApiTags('role')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @Get('count')
  count(@Query() { query }: SearchQueryParams) {
    return this.roleService.count({
      name: {
        contains: query ?? '',
        mode: 'insensitive'
      }
    });
  }

  @Get()
  findAll(@Query() { take, skip }: PaginationParams, @Query() { query }: SearchQueryParams) {
    console.log('query: ', query);
    return this.roleService.findAll({
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
    return this.roleService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roleService.remove(id);
  }
}
