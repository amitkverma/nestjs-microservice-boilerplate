import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma } from '@prisma/client';
import { UpdateRoleDto } from './dtos';

@Injectable()
export class RolesService {
    constructor(private prisma: PrismaService) { }

    async createRole(roleData: Prisma.RoleCreateInput) {
        return this.prisma.role.create({
            data: roleData
        });
    }

    async getRole(roleId: number) {
        return this.prisma.role.findFirst({
            where: {
                id: roleId
            }
        })
    }

    async findAll() {
        return this.prisma.role.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    update(id: number, updateTenantDto: UpdateRoleDto) {
        return this.prisma.role.update({
            where: { id: id },
            data: updateTenantDto
        });
    }

    remove(id: number) {
        return this.prisma.role.delete({
            where: {
                id
            }
        })
    }


}
