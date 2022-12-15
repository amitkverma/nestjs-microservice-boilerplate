import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { CreateEmployeeDto, Employee } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import {
  PaginationParams,
  SearchQueryParams,
} from '@spotlyt-backend/data/dtos';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import { Multer } from 'multer';

@ApiTags('Employee Controller')
@Controller('employee')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('tenant/:tenantId/employee/count')
  getEmployeesBelongingToATenantCount(
    @Query() { query }: SearchQueryParams,
    @Param('tenantId') tenantId: string
  ) {
    return this.employeeService.count({
      AND: [
        {
          OR: [
            {
              firstName: {
                contains: query ?? '',
                mode: 'insensitive',
              },
            },
            {
              email: {
                contains: query ?? '',
                mode: 'insensitive',
              },
            },
            {
              lastName: {
                contains: query ?? '',
                mode: 'insensitive',
              },
            },
          ],
        },
        {
          tenantId,
        },
      ],
    });
  }

  @Get('tenant/:tenantId/employee')
  getEmployeesBelongingToATenant(
    @Query() { take, skip }: PaginationParams,
    @Query() { query }: SearchQueryParams,
    @Param('tenantId') tenantId: string
  ) {
    return this.employeeService.findAll({
      take: +take,
      skip: +skip,
      where: {
        AND: [
          {
            OR: [
              {
                firstName: {
                  contains: query ?? '',
                  mode: 'insensitive',
                },
              },
              {
                email: {
                  contains: query ?? '',
                  mode: 'insensitive',
                },
              },
              {
                lastName: {
                  contains: query ?? '',
                  mode: 'insensitive',
                },
              },
            ],
          },
          {
            tenantId,
          },
        ],
      },
    });
  }

  @Get('count')
  count(@Query() { query }: SearchQueryParams) {
    return this.employeeService.count({
      OR: [
        {
          firstName: {
            contains: query ?? '',
            mode: 'insensitive',
          },
        },
        {
          email: {
            contains: query ?? '',
            mode: 'insensitive',
          },
        },
        {
          lastName: {
            contains: query ?? '',
            mode: 'insensitive',
          },
        },
      ],
    });
  }

  @Get()
  findAll(
    @Query() { take, skip }: PaginationParams,
    @Query() { query }: SearchQueryParams
  ) {
    return this.employeeService.findAll({
      take: +take,
      skip: +skip,
      where: {
        OR: [
          {
            firstName: {
              contains: query ?? '',
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: query ?? '',
              mode: 'insensitive',
            },
          },
          {
            lastName: {
              contains: query ?? '',
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('bulk/:tenantId')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  async uploadFileAndPassValidation(
    @Param('tenantId') tenantId: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'csv',
        })
        .build()
    )
    file: Express.Multer.File
  ) {
    try {
      return this.employeeService.createBulk(file.filename, tenantId);
    } catch (err: unknown) {
      throw new HttpException(
        (err as Error).message,
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
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
  update(
    @Param('id') id: string,
    @Body() updateEmployeeDto: UpdateEmployeeDto
  ) {
    return this.employeeService.update(id, updateEmployeeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.employeeService.remove(id);
  }
}
