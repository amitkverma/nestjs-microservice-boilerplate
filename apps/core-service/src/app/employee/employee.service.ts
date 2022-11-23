import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto, Employee } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '@spotlyt-backend/database';
import { Prisma } from '@prisma/client';
import * as csvParser from 'csv-parser';
import { createReadStream } from 'fs';
import { setValue } from './utils/setNestedFeilds';


@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) { }

  async create(createEmployeeDto: CreateEmployeeDto) {
    return this.prisma.employee.create({ data: createEmployeeDto });
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

  createBulk(fileName: string, tenantId: string) {
    const employees = [];
    createReadStream(`./upload/${fileName}`).pipe(csvParser()).on('data', (payloadRaw: any) => {
      employees.push(this.employeeMapperFromCsv(tenantId, payloadRaw));
    }).on('end', async () => {
      await this.prisma.employee.createMany({ skipDuplicates: true, data: employees });
    })
  }


  employeeMapperFromCsv(tenantId: string, payload: any): Employee {
    const name = payload?.['Name']?.split(' ');
    return {
      dob: Date.parse(payload?.['Birth Date']) ? payload?.['Birth Date'] : null,
      companyTitleId: payload?.['Role']?.toLowerCase(),
      email: payload?.['Email id'],
      firstName: name?.[0] ?? '',
      lastName: name?.[1] ?? '',
      hiredOn: Date.parse(payload?.['Joining Date']) ? payload?.['Joining Date'] : null,
      picture: payload?.['Picture'] ?? null,
      teamId: payload?.['Department']?.toLowerCase(),
      gender: payload?.['Gender']?.toLowerCase() ?? 'Male',
      status: 'Active',
      tenantId: tenantId,
    };
  }
}
