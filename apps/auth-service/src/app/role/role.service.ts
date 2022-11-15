import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) { }
  create(createRoleDto: CreateRoleDto) {
    return this.prisma.role.create({ data: createRoleDto })
  }

  findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.RoleWhereUniqueInput;
    where?: Prisma.RoleWhereInput;
    orderBy?: Prisma.RoleOrderByWithRelationInput;
  }) {
    return this.prisma.role.findMany(params)
  }

  findOne(id: string) {
    return this.prisma.role.findFirst({ where: { id } })
  }

  update(id: string, updateRoleDto: UpdateRoleDto) {
    return this.prisma.role.update({ where: { id }, data: updateRoleDto })
  }

  remove(id: string) {
    return this.prisma.role.delete({ where: { id } })
  }
}
