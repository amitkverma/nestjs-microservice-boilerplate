import { HttpException, HttpStatus } from '@nestjs/common';
import { verify } from 'jsonwebtoken';
import { JWT_SECRATE, ACCESS_TOKEN } from '@spotlyt-backend/data/constants';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { IJwtTokenData } from '@spotlyt-backend/data/interfaces';


export const Authenticate = createParamDecorator(
    (args: unknown, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest();
        const authHeader = request.header('authorization');

        if (!authHeader) {
            throw new HttpException('Auth Token Needed [authorixation: Bearer auth-token]', HttpStatus.UNAUTHORIZED);
        }

        const bearerToken: string[] = authHeader.split(' ');
        const token: string = bearerToken[1];

        try {
            const payload = verify(token, JWT_SECRATE);
            const jwtPayload = (payload as IJwtTokenData);

            if (jwtPayload.data.type !== ACCESS_TOKEN) {
                throw new HttpException('Access Token Needed', HttpStatus.UNPROCESSABLE_ENTITY);
            }
            request.user = jwtPayload.data;
            return jwtPayload.data;
        } catch (err: unknown) {
            throw new HttpException((err as Error).message, HttpStatus.UNAUTHORIZED);
        }
    },
);