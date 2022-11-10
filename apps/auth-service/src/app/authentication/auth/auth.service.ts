import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User, Prisma } from '@prisma/client';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwtService: JwtService) { }

    async userSignUp(data: Prisma.UserCreateInput): Promise<Omit<User, "password">> {
        return this.prisma.user.create({
            data: { ...data, password: await hash(data.password, 10) },
            select: {
                email: true,
                id: true,
                name: true
            }
        })
    }

    checkEmailExsists(email: string): Promise<User> {
        return this.prisma.user.findFirst({
            where: {
                email: email
            }
        })
    }


    async checkUserAndVerify(email: string, password: string): Promise<User> {
        const user = await this.checkEmailExsists(email);

        if (await compare(user.password, password)) {
            return user;
        }

        throw new HttpException('Invalid User', HttpStatus.NOT_FOUND);
    }

    async login(email: string, password: string) {
        const user = await this.checkEmailExsists(email);
        if (!user) { throw new HttpException('Invalid User', HttpStatus.NOT_FOUND) }
        const verificationStatus = await compare(password, user.password);
        if (verificationStatus) {
            return this.getTokens(user)
        }

        throw new HttpException('Invalid User', HttpStatus.NOT_FOUND);
    }

    async getTokens(user: User) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: user.id,
                    email: user.email,
                    type: 'access_token'
                },
                {
                    secret: 'LLLKKK2',
                    expiresIn: '15m',
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: user.id,
                    email: user.email,
                    type: 'refresh_token'
                },
                {
                    secret: 'LLLKKK2',
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
