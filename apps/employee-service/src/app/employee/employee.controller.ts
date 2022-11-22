import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationParams, SearchQueryParams } from '@spotlyt-backend/data/dtos';


@ApiTags('Employee Controller')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) { }

  @Get('count')
  count(@Query() { query }: SearchQueryParams) {
    return this.employeeService.count({
      OR: [
        {
          firstName: {
            contains: query ?? '',
            mode: 'insensitive'
          }
        },
        {
          email: {
            contains: query ?? '',
            mode: 'insensitive'
          }
        },
        {
          lastName: {
            contains: query ?? '',
            mode: 'insensitive'
          }
        }
      ]
    });
  }

  @Get()
  findAll(@Query() { take, skip }: PaginationParams,
    @Query() { query }: SearchQueryParams) {
    return this.employeeService.findAll({
      take: +take, skip: +skip, where: {
        OR: [
          {
            firstName: {
              contains: query ?? '',
              mode: 'insensitive'
            }
          },
          {
            email: {
              contains: query ?? '',
              mode: 'insensitive'
            }
          },
          {
            lastName: {
              contains: query ?? '',
              mode: 'insensitive'
            }
          }
        ]
      },
    });
  }

  @Post()
  create(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.employeeService.create(createEmployeeDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.employeeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateEmployeeDto: UpdateEmployeeDto) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }
}
