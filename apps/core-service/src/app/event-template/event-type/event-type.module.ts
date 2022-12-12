import { Module } from '@nestjs/common';
import { EventTypeService } from './event-type.service';
import { EventTypeController } from './event-type.controller';
import { PrismaModule } from '@spotlyt-backend/database';

@Module({
  imports: [PrismaModule],
  controllers: [EventTypeController],
  providers: [EventTypeService]
})
export class EventTypeModule { }
