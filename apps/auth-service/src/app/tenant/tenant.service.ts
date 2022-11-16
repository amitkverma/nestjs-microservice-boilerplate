import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantService {
  constructor(private prisma: PrismaService) { }

  async create(createTenantDto: CreateTenantDto) {
    const { auth, ...tenantData } = createTenantDto;
    const newtenant = await this.prisma.tenant.create({ data: tenantData });
    await this.prisma.authClients.create({ data: { ...auth, tenantId: newtenant.id } })
    return newtenant;
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

    const tenant = await this.prisma.tenant.update({ where: { id }, data: tenantData })
    if(auth){
      const tenantAuth = await this.prisma.authClients.update({
        where: {
          tenantId: tenant.id
        }, data: auth
      })
    }
    return tenant;
  }

  async remove(id: string) {
    await this.prisma.authClients.delete({ where: { tenantId: id } });
    return this.prisma.tenant.delete({ where: { id } })
  }
}
