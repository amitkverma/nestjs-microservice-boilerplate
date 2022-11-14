import { Injectable } from '@nestjs/common';
import { PrismaService } from '@spotlyt-backend/database';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';

@Injectable()
export class TenantService {

  constructor(private prismaService: PrismaService) {}

  create(createTenantDto: CreateTenantDto) {
    return this.prismaService.tenant.create({
      data: createTenantDto
    });
  }

  findAll() {
    return this.prismaService.tenant.findMany();
  }

  findOne(id: number) {
    return this.prismaService.tenant.findUnique({ where: { id: id } });
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return this.prismaService.tenant.update({
      where: { id: id },
      data: updateTenantDto
    });
  }

  remove(id: number) {
    return this.prismaService.tenant.delete({ where: { id: id } });
  }
}
