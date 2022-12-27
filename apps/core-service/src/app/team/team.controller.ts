import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post('tenant/:tenantId')
  create(@Body() createTeamDto: CreateTeamDto, @Param('tenantId') tenantId: string) {
    return this.teamService.create(createTeamDto, tenantId);
  }

  @Get('tenant/:tenantId')
  findAll(@Param('tenantId') tenantId: string) {
    return this.teamService.findAll({where: {tenantId}});
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.teamService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.update(id, updateTeamDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.teamService.remove(id);
  }
}
