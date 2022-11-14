import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../../prisma.service';

@Injectable()
export class TenantService {
    constructor(private prisma: PrismaService){}


    async createTenant(newTenantData: Prisma.TenantCreateInput) {
        return this.prisma.tenant.create({
            data: newTenantData
        })
    }
    
    async getTenant(tenantId: number){
        return this.prisma.tenant.findFirst({
            where: {
                id: tenantId
            }
        })
    }
}
