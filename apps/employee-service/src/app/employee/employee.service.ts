import { Injectable } from '@nestjs/common';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '@spotlyt-backend/database';
import { Prisma } from '@prisma/client';

@Injectable()
export class EmployeeService {
  constructor(private prisma: PrismaService) { }

  async create(createEmployeeDto: CreateEmployeeDto) {
    const { companyTitle, team, ...employeeData } = createEmployeeDto;
    return this.prisma.employee.create({
      data: { ...employeeData, companyTitle: { create: companyTitle }, team: { create: team } },
    });
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
    return { count: await this.prisma.employee.count({ where }) }
  }

  async findOne(id: string) {
    return this.prisma.employee.findFirst({
      where: { id },
      include: {
        companyTitle: true,
        team: true,
      }
    })
  }

  async update(id: string, updateEmployeeDto: UpdateEmployeeDto) {
    const { companyTitle, team, ...employeeData } = updateEmployeeDto;
    if (employeeData) {
      await this.prisma.employee.update({ where: { id }, data: { ...employeeData } });
    }
    if (companyTitle) {
      await this.prisma.companyTitle.update({ where: { employeeId: id }, data: companyTitle })
    }
    if (team) {
      await this.prisma.team.update({ where: { employeeId: id }, data: team })
    }
    return this.prisma.employee.findFirst({
      where: { id }, include: {
        team: true,
        companyTitle: true
      }
    });
  }

  async remove(id: string) {
    return this.prisma.employee.delete({ where: { id } })
  }

  createBulk() {
    return `unimplemented`;
  }
}
