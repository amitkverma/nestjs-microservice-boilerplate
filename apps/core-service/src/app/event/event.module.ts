import { Module } from '@nestjs/common';
import { EventService } from './event.service';
import { EventController } from './event.controller';
import { PrismaModule } from '@spotlyt-backend/database';


@Module({
  imports: [PrismaModule],
  controllers: [EventController],
  providers: [EventService]
})
export class EventModule { }
