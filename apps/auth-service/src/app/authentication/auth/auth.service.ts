import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { Prisma, Status } from '@prisma/client';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { IJwtTokenData, IGenerateJWTPayload } from '@spotlyt-backend/data/interfaces'
import { JWT_EXPIRE_TIME, JWT_SECRATE, ACCESS_TOKEN, REFRESH_TOKEN } from '@spotlyt-backend/data/constants';
import { UserStatusChangeDto, ResetPasswordDto } from '../../dtos';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async resetPassword(restPasswordPayload: ResetPasswordDto){
        const user = await this.checkEmailExsists(restPasswordPayload.email);
        if(!user){ throw new HttpException('User Doesnot exsits', HttpStatus.NOT_FOUND)}

        const verificationStatus = await compare(restPasswordPayload.oldPassword, user.password);
        if(verificationStatus){
            await this.prisma.user.update({
                where: {
                    id: user.id
                },
                data: {
                    password: await hash(restPasswordPayload.newPassword, 10)
                }
            })
            return;
        }
        throw new HttpException('Invalid Creds Passed', HttpStatus.UNPROCESSABLE_ENTITY);
    }

    async userStatusChange(newUserStatusPayload: UserStatusChangeDto){
        const user = await this.checkEmailExsists(newUserStatusPayload.email);
        if(!user){ throw new HttpException('User Doesnot exsits', HttpStatus.NOT_FOUND)}
        return this.prisma.userTenant.update({
            where: {
                userId: user.id
            },
            data: {
                status: newUserStatusPayload.status
            }
        });
    }

    async userSignUp(data: Prisma.UserCreateInput & { roleId: number, tenantId: number }) {
        const { roleId, tenantId, ...userData } = data
        const user = await this.prisma.user.create({
            data: { ...userData, password: await hash(userData.password, 10) }
        })

        if (!user.id) {
            throw new HttpException('User Signup Failed', HttpStatus.FAILED_DEPENDENCY)
        }
        await this.prisma.userTenant.create({
            data: {
                status: Status.Inactive,
                roleId: roleId,
                tenantId: tenantId,
                userId: user.id
            }
        }).catch(async (err: Error) => {
            await this.prisma.user.delete({ where: { id: user.id } });
            throw new HttpException(err.message, HttpStatus.EXPECTATION_FAILED)
        })

        return user
    }

    checkEmailExsists(email: string) {
        return this.prisma.user.findFirst({
            where: {
                email: email
            },
            include: {
                userTenant: {
                    include: {
                        role: true,
                        tenant: true
                    }
                },
            }
        })
    }

    async login(email: string, password: string) {
        const user = await this.checkEmailExsists(email);
        if (!user) { throw new HttpException('Invalid User', HttpStatus.NOT_FOUND) }
        if (user.userTenant.status === Status.Inactive) { throw new HttpException('User Not Active', HttpStatus.FORBIDDEN) }
        const verificationStatus = await compare(password, user.password);
        if (verificationStatus) {
            return this.getTokens({
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                permission: user.userTenant.role.permissions,
                roleId: user.userTenant.roleId,
                roleName: user.userTenant.role.name,
                status: user.userTenant.status,
                tenantId: user.userTenant.tenantId,
                tenantName: user.userTenant.tenant.name,
                userId: user.id
            })
        }

        throw new HttpException('Invalid User', HttpStatus.NOT_FOUND);
    }

    async refresh(refreshToken: string) {
        try{
            const payload: IJwtTokenData = await this.jwtService.verifyAsync(refreshToken);
            if(payload.data.type === REFRESH_TOKEN){
                const {type, id, ...userPayloadData} = payload.data;
                return this.getTokens(userPayloadData)
            }
            throw new UnauthorizedException('Invalid Refresh Token');
        }catch(err: unknown){
            throw new UnauthorizedException((err as Error).message);

        }

    }

    async getTokens(userData: IGenerateJWTPayload) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: userData.userId,
                    data: {
                        type: ACCESS_TOKEN,
                        id: userData.userId,
                        ...userData
                    }
                },
                {
                    secret: JWT_SECRATE,
                    expiresIn: JWT_EXPIRE_TIME,
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: userData.userId,
                    data: {
                        type: REFRESH_TOKEN,
                        id: userData.userId,
                        ...userData
                    }
                },
                {
                    secret: JWT_SECRATE,
                    expiresIn: '7d',
                },
            ),
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }

}
