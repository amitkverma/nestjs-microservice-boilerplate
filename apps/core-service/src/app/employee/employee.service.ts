import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { CreateEmployeeDto, Employee } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';
import { PrismaService } from '@spotlyt-backend/database';
import { Prisma, Team, CompanyTitle } from '@prisma/client';
import {ICompanyTitles, ITeamsEntity} from './entities/utils.entity'

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

    const teamsBulkData: ITeamsEntity[] = [];
    teams?.map((team: string) => {
      if(team) teamsBulkData.push({ name: team, tenantId });
    });

    const companyTitlesBulkData: ICompanyTitles[] = [];
    companyTitles?.map((companyTitle: string) => {
      if(companyTitle) companyTitlesBulkData.push({ name: companyTitle, tenantId});
    });

    await Promise.all([
      this.prisma.companyTitle.createMany({ skipDuplicates: true, data: companyTitlesBulkData }),
      this.prisma.team.createMany({ skipDuplicates: true, data: teamsBulkData }),
    ]);

    const companyTitlesData = await this.prisma.companyTitle.findMany({where: {tenantId} });
    const teamsData = await this.prisma.team.findMany({where: {tenantId} });

    const teamMapper = new Map<string, Team>();
    for(const teamData of teamsData){
      teamMapper.set(teamData.name, teamData);
    }

    const companyTitleMapper = new Map<string, CompanyTitle>();
    for(const companyTitleData of companyTitlesData){
      companyTitleMapper.set(companyTitleData.name, companyTitleData);
    }

    const employees = dfd.toJSON(df);

    let employeesBulkData: Employee[];
    if (Array.isArray(employees)) {
      employeesBulkData = this.employeeMapperFromCsvData(tenantId, employees, companyTitleMapper, teamMapper);
    }
    
    return this.prisma.employee.createMany({ skipDuplicates: true, data: employeesBulkData });
  }


  employeeMapperFromCsvData(tenantId: string, employees: object[], 
    companyTitleMapper: Map<string, CompanyTitle>, 
    teamMapper: Map<string, Team>): Employee[] {

      const employeeList: Employee[] = [];
      for(const payload of employees){
        const name = payload?.['Name']?.split(' ');
        const companyTitle = payload?.['Role'];
        const team = payload?.['Department'];
        if(companyTitle && team){
          employeeList.push({
            dob: Date.parse(payload?.['Birth Date']) ? payload?.['Birth Date'] : null,
            companyTitleId: companyTitleMapper.get(companyTitle).id,
            email: payload?.['Email id'],
            phone: payload?.['Phone Number']?.toString() ?? null,
            firstName: name?.[0] ?? '',
            lastName: name?.[1] ?? '',
            hiredOn: Date.parse(payload?.['Joining Date']) ? payload?.['Joining Date'] : null,
            picture: payload?.['Picture'] ?? null,
            teamId: teamMapper.get(team).id,
            gender: payload?.['Gender'] ?? 'Male',
            status: 'Active',
            tenantId: tenantId,
          });
        }
        else{
          Logger.error(`Payload ${payload} is missing data`);
          throw new HttpException(`Payload ${payload} is missing data`, HttpStatus.BAD_REQUEST)
        }
        
      }
    return employeeList;
  }
}
