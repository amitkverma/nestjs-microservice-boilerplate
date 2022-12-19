import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { PrismaService } from '@spotlyt-backend/database';
import { Prisma } from '@prisma/client';

@Injectable()
export class TeamService {

  constructor(private prisma: PrismaService) { }

  async create(createTeamDto: CreateTeamDto) {
    const team = await this.prisma.team.findFirst({where: {name: createTeamDto.name}});
    if(team) throw new HttpException(`This Team already Exsists`, HttpStatus.CONFLICT);
    return this.prisma.team.create({ data: createTeamDto });
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TeamWhereUniqueInput;
    where?: Prisma.TeamWhereInput;
    orderBy?: Prisma.TeamOrderByWithRelationInput;
  }) {
    return this.prisma.team.findMany(params);
  }

  async findOne(id: string) {
    return this.prisma.team.findFirst({ where: { id } })
  }

  async update(id: string, updateTeamDto: UpdateTeamDto) {
    return this.prisma.team.update({ where: { id }, data: updateTeamDto });
  }

  remove(id: string) {
    return this.prisma.team.delete({ where: { id } })
  }
}
