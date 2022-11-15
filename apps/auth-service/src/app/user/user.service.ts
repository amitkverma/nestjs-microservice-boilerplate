import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Prisma, UserStatus } from '@prisma/client';
import { hash } from 'bcrypt';
@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) { }


  async create(createUserDto: CreateUserDto) {
    const { roleId, tenantId, password, ...userInfo } = createUserDto;
    return this.prisma.user.create({
      data: {
        ...userInfo,
        status: UserStatus.Active,
        isDeleted: false,
        password: await hash(password, 10),
        roleId: roleId,
        tenantId: tenantId
      }
    });
  }

  findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }) {
    return this.prisma.user.findMany({
      ...params, where: {
        isDeleted: false
      },
      include: {
        role: true,
      }
    });
  }

  findOne(id: string) {
    return this.prisma.user.findFirst({
      where: { id, isDeleted: false }, include: {
        role: true,
        tenant: {
          include: {
            authId: true
          }
        }
      }
    })
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.email) {
      delete updateUserDto.email;
    }
    if (updateUserDto.password) {
      delete updateUserDto.password;
    }
    if (updateUserDto.tenantId) {
      delete updateUserDto.tenantId;
    }
    return this.prisma.user.update({
      where: { id },
      data: { ...updateUserDto }
    });
  }

  remove(id: string) {
    return this.prisma.user.update({
      where: {
        id
      },
      data: {
        isDeleted: true,
        deletedOn: (new Date()).toISOString()
      }
    })
  }
}
