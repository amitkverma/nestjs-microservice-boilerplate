import { Module } from '@nestjs/common';
import { EventTemplateService } from './event-template.service';
import { EventTemplateController } from './event-template.controller';
import { PrismaModule } from '@spotlyt-backend/database';
import { EventCategoryModule } from './event-category/event-category.module';
import { EventTypeModule } from './event-type/event-type.module';

@Module({
  imports: [PrismaModule, EventCategoryModule, EventTypeModule],
  controllers: [EventTemplateController],
  providers: [EventTemplateService]
})
export class EventTemplateModule { }
