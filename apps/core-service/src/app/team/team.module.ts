import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { PrismaModule } from '@spotlyt-backend/database';


@Module({
  imports: [PrismaModule],
  controllers: [TeamController],
  providers: [TeamService]
})
export class TeamModule {}
