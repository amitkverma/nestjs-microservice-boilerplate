import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationController } from './authorization/authorization.controller';
import { AuthService } from './authorization/auth/auth.service';

@Module({
  imports: [],
  controllers: [AppController, AuthorizationController],
  providers: [AppService, AuthService],
})
export class AppModule {}
