import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from "@nestjs/passport"
import { JWT_ALGO } from '@spotlyt-backend/data/constants';
@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      signOptions: {
        algorithm: JWT_ALGO,
      }
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService]
})
export class AuthModule {}
