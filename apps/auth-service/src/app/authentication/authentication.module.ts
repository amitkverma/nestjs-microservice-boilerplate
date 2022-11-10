import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import {JWT_ALGO, JWT_SECRATE} from '@spotlyt-backend/data/constants'
import { PassportModule } from "@nestjs/passport"

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: JWT_SECRATE,
      signOptions: {
        algorithm: JWT_ALGO,

      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService]
})
export class AuthenticationModule {}
