import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../../prisma.service';
import { User, Prisma } from '@prisma/client';
import { hash, compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JWT_EXPIRE_TIME, JWT_SECRATE, ACCESS_TOKEN, REFRESH_TOKEN } from '@spotlyt-backend/data/constants';
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
            return this.getTokens({ email: user.email, id: user.id })
        }

        throw new HttpException('Invalid User', HttpStatus.NOT_FOUND);
    }

    async refresh(refreshToken: string){
        try{
            const payload: any = await this.jwtService.verifyAsync(refreshToken);
            if(payload?.data?.type === REFRESH_TOKEN){
                return this.getTokens({email: payload?.data?.email, id: payload?.data?.id});
            }
            throw new UnauthorizedException('Invalid Refresh Token');
        }catch(err: unknown){
            console.log(err);   
            throw new UnauthorizedException((err as Error).message);
        }
        
    }

    async getTokens({ email, id }: { email: string, id: number }) {
        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(
                {
                    sub: id,
                    data: {
                        email: email,
                        type: ACCESS_TOKEN,
                        id: id
                    }
                },
                {
                    secret: JWT_SECRATE,
                    expiresIn: JWT_EXPIRE_TIME,
                },
            ),
            this.jwtService.signAsync(
                {
                    sub: id,
                    data: {
                        email: email,
                        type: REFRESH_TOKEN,
                        id: id
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
