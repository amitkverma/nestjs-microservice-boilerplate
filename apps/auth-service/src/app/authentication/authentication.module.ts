import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({
      signOptions: { expiresIn: '1h' },
    })
  ],
  providers: [AuthService, PrismaService]
})
export class AuthenticationModule { }
