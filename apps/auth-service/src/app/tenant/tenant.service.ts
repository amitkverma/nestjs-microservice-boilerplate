import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { PrismaService } from '@spotlyt-backend/database';

@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) { }

  async create(createTenantDto: CreateTenantDto) {
    const { auth, ...tenantData } = createTenantDto;
    return this.prisma.tenant.create({
      data: {
        ...tenantData, auth: {
          create: auth
        }
      },
      include: {
        auth: true
      }
    })
  }

  findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TenantWhereUniqueInput;
    where?: Prisma.TenantWhereInput;
    orderBy?: Prisma.TenantOrderByWithRelationInput;
  }) {
    return this.prisma.tenant.findMany({
      ...params, include: {
        auth: true
      }
    })
  }

  findOne(id: string) {
    return this.prisma.tenant.findFirst({
      where: {
        id
      },
      include: {
        auth: true
      }
    })
  }

  async update(id: string, updateTenantDto: UpdateTenantDto) {
    const { auth, ...tenantData } = updateTenantDto;
    if (tenantData) {
      await this.prisma.tenant.update({ where: { id }, data: tenantData })
    }
    if (auth) {
      await this.prisma.authClients.update({
        where: {
          tenantId: id
        }, data: auth
      })
    }
    return this.prisma.tenant.findFirst({ where: { id }, include: { auth: true } });
  }

  async remove(id: string) {
    await this.prisma.authClients.delete({ where: { tenantId: id } });
    return this.prisma.tenant.delete({ where: { id } })
  }

  async count(where?: Prisma.TenantWhereInput) {
    return { "count": await this.prisma.tenant.count({ where }) };
  }
}
