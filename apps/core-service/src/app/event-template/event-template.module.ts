import { Module } from '@nestjs/common';
import { EventTemplateService } from './event-template.service';
import { EventTemplateController } from './event-template.controller';
import { PrismaModule } from '@spotlyt-backend/database';
import { EventCategoryModule } from './event-category/event-category.module';
import { EventTypeModule } from './event-type/event-type.module';
import { EventMediasModule } from './event-medias/event-medias.module';

@Module({
  imports: [PrismaModule, EventCategoryModule, EventTypeModule, EventMediasModule],
  controllers: [EventTemplateController],
  providers: [EventTemplateService]
})
export class EventTemplateModule { }
