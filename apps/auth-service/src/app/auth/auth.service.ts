import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UserStatus } from '@prisma/client';
import { PrismaService } from '@spotlyt-backend/database';
import { JwtService } from '@nestjs/jwt';
import { IJWTPayload, IJwtTokenData } from '@spotlyt-backend/data/interfaces';
import { ACCESS_TOKEN, REFRESH_TOKEN, JWT_SECRATE } from '@spotlyt-backend/data/constants';
import { compare, hash } from 'bcrypt';
@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: { email }, include: {
                role: true,
                tenant: {
                    include: {
                        auth: true
                    }
                }
            }
        });
        if (!user) { throw new HttpException('User Invalid', HttpStatus.NOT_FOUND) }

        if (user.tenant.status !== 'Active') { throw new HttpException(`${user.tenant.name} isn't Active, users cant login`, HttpStatus.FORBIDDEN) }

        if (user.status !== UserStatus.Active) { throw new HttpException(`User is ${user.status}`, HttpStatus.FORBIDDEN) }

        const verificationStatus = await compare(password, user.password);

        if (verificationStatus) {
            return this.getTokens({
                accessExpiryTime: user.tenant.auth.accessTokenExpiration,
                refreshExpiryTIme: user.tenant.auth.refreshTokenExpiration,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                roleId: user.roleId,
                roleName: user.role.name,
                status: user.status,
                tenantId: user.tenantId,
                tenantName: user.tenant.name,
                userId: user.id
            }, JWT_SECRATE)
        }

        throw new HttpException('User Invalid', HttpStatus.NOT_FOUND)
    }

    async refresh(refreshToken: string, userId: string) {
        try {
            const user = await this.prisma.user.findFirst({
                where: { id: userId }, include: {
                    role: true,
                    tenant: {
                        include: {
                            auth: true
                        }
                    }
                }
            });
            if (!user) { throw new HttpException('User Invalid', HttpStatus.NOT_FOUND) }
            const payload: IJwtTokenData = await this.jwtService.verifyAsync(refreshToken, {
                secret: JWT_SECRATE
            });
            if (payload.data.type === REFRESH_TOKEN) {
                return this.getTokens({
                    accessExpiryTime: user.tenant.auth.accessTokenExpiration,
                    refreshExpiryTIme: user.tenant.auth.refreshTokenExpiration,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    roleId: user.roleId,
                    roleName: user.role.name,
                    status: user.status,
                    tenantId: user.tenantId,
                    tenantName: user.tenant.name,
                    userId: user.id
                }, JWT_SECRATE)
            }
            throw new UnauthorizedException('Invalid Refresh Token');
        } catch (err: unknown) {
            throw new UnauthorizedException((err as Error).message);
        }

    }

    async getTokens(userData: IJWTPayload, secrate: string) {
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
                    secret: secrate,
                    expiresIn: userData.accessExpiryTime,
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
                    secret: secrate,
                    expiresIn: userData.refreshExpiryTIme,
                },
            ),
            this.prisma.user.update({
                where: { id: userData.userId },
                data: { lastLoggedIn: (new Date()).toISOString() }
            })
        ]);

        return {
            accessToken,
            refreshToken,
        };
    }


    async resetPassword(userId: string, oldPassword: string, newPassword: string) {
        const user = await this.prisma.user.findFirst({ where: { id: userId } });
        if (!user) { throw new HttpException('User Invalid', HttpStatus.NOT_FOUND) }

        const verificationStatus = await compare(oldPassword, user.password);
        if (!verificationStatus) { throw new HttpException('User Invalid', HttpStatus.NOT_FOUND); }

        await this.changePassword(userId, newPassword);
    }


    async changePassword(userId: string, newPassword: string) {
        return this.prisma.user.update({
            where: { id: userId }, data: {
                password: await hash(newPassword, 10)
            },
            select: {
                email: true
            }
        });
    }

    async getUser(userId: string) {
        return this.prisma.user.findFirst({
            where: {
                id: userId,
                isDeleted: false
            },
            include: {
                role: true,
                tenant: true
            }
        })
    }

}
