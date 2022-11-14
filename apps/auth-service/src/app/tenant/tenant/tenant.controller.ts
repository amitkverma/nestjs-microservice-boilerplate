import { TenantService } from './tenant.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Tenant } from '@prisma/client';
import { ResponseEntity, IApiResponse } from '../../entities';
import { TenantDto } from './../../dtos'

@Controller('tenant')
@ApiTags('tenant')
export class TenantController {
    constructor(private tenantService: TenantService){}

    @Post()
    @ApiCreatedResponse({ type: ResponseEntity<Tenant> })
    async createNewTenant(@Body() tenantData: TenantDto): Promise<IApiResponse<Tenant>> {
        const newTenant = await this.tenantService.createTenant(tenantData);

        return {
            apiMeta: {
                status: 200,
                message: 'New Tenant Created',
            },
            data: newTenant
        }
    }

    @Get('tenant/:id')
    @ApiOkResponse({ type: ResponseEntity<Tenant> })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'TenantId Id',
        type: Number
    })
    async getRole(@Param('id') id: number): Promise<IApiResponse<Tenant>> {
        const tenant = await this.tenantService.getTenant(id);
        return {
            apiMeta: {
                message: 'Tenant Fetched',
                status: 200,
            },
            data: tenant
        }
    }
}
