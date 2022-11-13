import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RolesService {
    constructor(private prisma: PrismaService) {}

    async createRole(roleData: Prisma.RoleCreateInput) {
        return this.prisma.role.create({
            data: roleData
        });
    }

    async getRole(roleId: number){
        return this.prisma.role.findFirst({
            where: {
                id: roleId
            }
        })
    }
}
