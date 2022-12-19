import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { PrismaService } from '@spotlyt-backend/database';
import { Prisma } from '@prisma/client';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(createCompanyDto: CreateCompanyDto) {
    const compantTitle = await this.prisma.companyTitle.findFirst({
      where: { name: createCompanyDto.name },
    });
    if (compantTitle)
      throw new HttpException(
        `This Role Title already Exsists`,
        HttpStatus.CONFLICT
      );
    return this.prisma.companyTitle.create({
      data: {
        ...createCompanyDto,
        name: createCompanyDto.name,
      },
    });
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.CompanyTitleWhereUniqueInput;
    where?: Prisma.CompanyTitleWhereInput;
    orderBy?: Prisma.CompanyTitleOrderByWithRelationInput;
  }) {
    return this.prisma.companyTitle.findMany(params);
  }

  async findOne(id: string) {
    return this.prisma.companyTitle.findFirst({ where: { id } });
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return this.prisma.companyTitle.update({
      where: { id },
      data: updateCompanyDto,
    });
  }

  remove(id: string) {
    return this.prisma.companyTitle.delete({ where: { id } });
  }
}
