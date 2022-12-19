import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@spotlyt-backend/database';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserStatusDto } from './dto/change-user-status.dto';
import { Prisma, UserStatus } from '@prisma/client';
import { hash } from 'bcrypt';
@Injectable()
export class UserService {
  private userFeilds: Prisma.UserSelect;
  private roleFeilds: Prisma.RoleSelect;
  private tenantFeilds: Prisma.TenantSelect;
  constructor(private prisma: PrismaService) {
    this.userFeilds = {
      email: true,
      lastLoggedIn: true,
      id: true,
      status: true,
      roleId: true,
      tenantId: true,
      firstName: true,
      lastName: true,
      middleName: true,
      employeeId: true,
      photoUrl: true,
      phone: true,

    };
    this.roleFeilds = {
      id: true,
      name: true,
      description: true
    };
    this.tenantFeilds = {
      name: true,
      id: true,
      address: true,
      auth: {
        select: {
          refreshTokenExpiration: true,
          accessTokenExpiration: true,
          name: true,
        }
      }
    };
  }


  async create(createUserDto: CreateUserDto) {
    const { roleId, tenantId, password, ...userInfo } = createUserDto;
    const user = await this.prisma.user.findFirst({
      where: {
        email: userInfo.email
      }
    });

    if (user) { throw new HttpException(`User Already Exsists with This Email`, HttpStatus.CONFLICT) }
    
    return this.prisma.user.create({
      data: {
        ...userInfo,
        status: UserStatus.Active,
        isDeleted: false,
        password: await hash(password, 10),
        roleId: roleId,
        tenantId: tenantId
      },
      select: this.userFeilds
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
        ...params.where,
        isDeleted: false
      },
      select: {
        ...this.userFeilds,
        role: {
          select: this.roleFeilds
        }
      }
    });
  }

  findOne(id: string) {
    return this.prisma.user.findFirst({
      where: { id, isDeleted: false },
      select: {
        ...this.userFeilds,
        role: {
          select: this.roleFeilds
        },
        tenant: {
          select: this.tenantFeilds
        }
      }
    });
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

  async count(where?: Prisma.UserWhereInput) {
    return { "count": await this.prisma.user.count({ where }) };
  }

  async changeUserStatus(id: string, userStatus: UserStatusDto) {
    return this.prisma.user.update({
      where: { id },
      data: {
        status: userStatus.status
      }
    })
  }
}
