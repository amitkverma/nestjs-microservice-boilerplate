import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from "@nestjs/passport"
import { JWT_ALGO } from '@spotlyt-backend/data/constants';
import { PrismaModule } from '@spotlyt-backend/database';
import { CaslModule } from './casl/casl.module';
@Module({
  imports: [
    PrismaModule,
    PassportModule,
    JwtModule.register({
      signOptions: {
        algorithm: JWT_ALGO,
      }
    }),
    CaslModule,
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
