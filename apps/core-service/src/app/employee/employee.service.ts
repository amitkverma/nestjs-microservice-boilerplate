import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateEmployeeDto, Employee } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '@spotlyt-backend/database';
import { Prisma } from '@prisma/client';
import * as dfd from "danfojs-node"

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) { }

  async create(createEmployeeDto: CreateEmployeeDto) {
    const employee = await this.prisma.employee.findFirst({
      where: {
        email: createEmployeeDto.email,
        tenantId: createEmployeeDto.tenantId
      }
    });
    if (employee) { throw new HttpException(`Employee Already Exsists`, HttpStatus.CONFLICT) }
    return this.prisma.employee.create({ data: { ...createEmployeeDto, status: 'Active' } });
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EmployeeWhereUniqueInput;
    where?: Prisma.EmployeeWhereInput;
    orderBy?: Prisma.EmployeeOrderByWithRelationInput;
  }) {
    return this.prisma.employee.findMany({
      ...params, include: {
        companyTitle: true,
        team: true
      }
    });
  }

  async count(where?: Prisma.EmployeeWhereInput) {
    return { count: await this.prisma.employee.count({ where }) };
  }

  async findOne(id: string) {
    return this.prisma.employee.findFirst({
      where: { id },
      include: {
        companyTitle: true,
        team: true,
      }
    });
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    if (updateEmployeeDto?.email) {
      delete updateEmployeeDto.email;
    }
    return this.prisma.employee.update({ where: { id }, data: updateEmployeeDto });
  }

  async remove(id: string) {
    return this.prisma.employee.delete({ where: { id } })
  }

  async createBulk(fileName: string, tenantId: string) {
    const df = await dfd.readCSV(`./upload/${fileName}`);
    const teams = df?.['Department']?.unique()?.values;
    const companyTitles = df?.['Role']?.unique()?.values;

    const teamsBulkData = [];
    teams?.map((team: string) => {
      if(team) teamsBulkData.push({ name: team });
    });

    const companyTitlesBulkData = [];
    companyTitles?.map((companyTitle: string) => {
      if(companyTitle) companyTitlesBulkData.push({ name: companyTitle });
    });


    const employeesBulkData = [];
    const employees = dfd.toJSON(df);


    // 
    
    // if (Array.isArray(employees)) {
    //   // employees?.map((employee: any) => employeesBulkData.push(this.employeeMapperFromCsvData(tenantId, employee)));
    // }

    // await Promise.all([
    //   this.prisma.companyTitle.createMany({ skipDuplicates: true, data: companyTitlesBulkData }),
    //   this.prisma.team.createMany({ skipDuplicates: true, data: teamsBulkData }),
    // ])
    // await this.prisma.employee.createMany({ skipDuplicates: true, data: employeesBulkData });
    // return true;
  }


  employeeMapperFromCsvData(tenantId: string, payload: any): Employee {
    const name = payload?.['Name']?.split(' ');
    return {
      dob: Date.parse(payload?.['Birth Date']) ? payload?.['Birth Date'] : null,
      companyTitleId: payload?.['Role'] ?? "Default",
      email: payload?.['Email id'],
      phone: payload?.['Phone Number']?.toString() ?? null,
      firstName: name?.[0] ?? '',
      lastName: name?.[1] ?? '',
      hiredOn: Date.parse(payload?.['Joining Date']) ? payload?.['Joining Date'] : null,
      picture: payload?.['Picture'] ?? null,
      teamId: payload?.['Department'] ?? "Default",
      gender: payload?.['Gender'] ?? 'Male',
      status: 'Active',
      tenantId: tenantId,
    };
  }
}
