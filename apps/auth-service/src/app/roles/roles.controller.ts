import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { RolesService } from './roles.service';

@Controller('roles')
@ApiTags('roles')
export class RolesController {
    constructor(private roleService: RolesService) { }


    @Post()
    async createRole(@Body() roleData: CreateRoleDto) {
        return this.roleService.createRole(roleData);
    }

    @Get(':id')
    @ApiParam({
        name: 'id',
        required: true,
        description: 'Role Id',
        type: Number
    })
    async getRole(@Param('id') id: string) {
        return this.roleService.getRole(+id);
    }

    @Get()
    findAll() {
        return this.roleService.findAll();
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateTenantDto: UpdateRoleDto) {
        return this.roleService.update(+id, updateTenantDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.roleService.remove(+id);
    }
}
