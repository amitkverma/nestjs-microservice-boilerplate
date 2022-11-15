import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma } from '@prisma/client';


@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {

  }

  findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    return this.prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      }
    })
  }

  findOne(id: number) {
    return this.prisma.user.findFirst({
      where: { id }
    })
  }

  update(id: number, updateUserDto: Prisma.UserUpdateInput) {
    return this.prisma.user.update({
      where: { id: id },
      data: updateUserDto
    });
  }

  async remove(id: number) {
    await this.prisma.userTenant.delete({
      where: {
        userId: id
      }
    });
    return this.prisma.user.delete({ where: { id } })
  }
}
