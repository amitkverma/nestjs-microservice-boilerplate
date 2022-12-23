import { Module } from '@nestjs/common';
import { EventMediasService } from './event-medias.service';
import { EventMediasController } from './event-medias.controller';
import { PrismaModule } from '@spotlyt-backend/database';

@Module({
  imports: [PrismaModule],
  controllers: [EventMediasController],
  providers: [EventMediasService]
})
export class EventMediasModule {}
