import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto, Employee } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '@spotlyt-backend/database';
import { Prisma } from '@prisma/client';
import * as dfd from "danfojs-node"

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) { }

  async create(createEmployeeDto: CreateEmployeeDto) {
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
    teams?.map((team: string) => teamsBulkData.push({ name: team }));

    const companyTitlesBulkData = [];
    companyTitles?.map((companyTitle: string) => companyTitlesBulkData.push({ name: companyTitle }));


    const employeesBulkData = [];
    const employees = dfd.toJSON(df);
    if (Array.isArray(employees)) {
      employees?.map((employee: any) => employeesBulkData.push(this.employeeMapperFromCsv(tenantId, employee)));
    }

    return Promise.all([
      this.prisma.companyTitle.createMany({ skipDuplicates: true, data: companyTitlesBulkData }),
      this.prisma.team.createMany({ skipDuplicates: true, data: teamsBulkData }),
      this.prisma.employee.createMany({ skipDuplicates: true, data: employeesBulkData })
    ])

  }


  employeeMapperFromCsv(tenantId: string, payload: any): Employee {
    const name = payload?.['Name']?.split(' ');
    return {
      dob: Date.parse(payload?.['Birth Date']) ? payload?.['Birth Date'] : null,
      companyTitleId: payload?.['Role'],
      email: payload?.['Email id'],
      firstName: name?.[0] ?? '',
      lastName: name?.[1] ?? '',
      hiredOn: Date.parse(payload?.['Joining Date']) ? payload?.['Joining Date'] : null,
      picture: payload?.['Picture'] ?? null,
      teamId: payload?.['Department'],
      gender: payload?.['Gender']?.toLowerCase() ?? 'Male',
      status: 'Active',
      tenantId: tenantId,
    };
  }
}
