import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { ResponseEntity, IApiResponse } from '../../entities';
import { RoleDto } from './../../dtos'
import { RolesService } from './roles.service';

@Controller('roles')
@ApiTags('roles')
export class RolesController {
    constructor(private roleService: RolesService) { }


    @Post()
    @ApiCreatedResponse({ type: ResponseEntity<Role> })
    async createRole(@Body() roleData: RoleDto): Promise<IApiResponse<Role>> {
        const role = await this.roleService.createRole(roleData);
        return {
            apiMeta: {
                message: 'Role Created',
                status: 201,
            },
            data: role
        }
    }

    @Get('role/:id')
    @ApiOkResponse({ type: ResponseEntity<Role> })
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Role Id',
        type: Number
    })
    async getRole(@Param('id') id: number): Promise<IApiResponse<Role>> {
        const role = await this.roleService.getRole(id);
        return {
            apiMeta: {
                message: 'Role Fetched',
                status: 200,
            },
            data: role
        }
    }


}
