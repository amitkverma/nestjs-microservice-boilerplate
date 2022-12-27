import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CompanyService } from './company.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@ApiTags('company-title')
@Controller('company-title')
export class CompanyController {
  constructor(private readonly companyService: CompanyService) { }

  @Post('tenant/:tenantId')
  create(@Body() createCompanyDto: CreateCompanyDto, @Param('tenantId') tenantId: string) {
    return this.companyService.create(createCompanyDto, tenantId);
  }

  @Get('tenant/:tenantId')
  findAll(@Param('tenantId') tenantId: string) {
    return this.companyService.findAll({where: {tenantId}});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
