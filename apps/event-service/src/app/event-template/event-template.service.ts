import { Injectable } from '@nestjs/common';
import { CreateEventTemplateDto } from './dto/create-event-template.dto';
import { UpdateEventTemplateDto } from './dto/update-event-template.dto';
import { PrismaService } from '@spotlyt-backend/database';

@Injectable()
export class EventTemplateService {
  constructor(private prisma: PrismaService) { }

  create(createEventTemplateDto: CreateEventTemplateDto) {
    return this.prisma.eventTemplate.create({ data: createEventTemplateDto })
  }

  findAll() {
  }

  findOne(id: string) {
    return this.prisma.eventTemplate.findFirst({
      where: { id }, include: {
        eventCategory: {
          include: {
            eventType: true
          }
        }
      }
    });
  }

  update(id: string, updateEventTemplateDto: UpdateEventTemplateDto) {
    if (updateEventTemplateDto.eventCategoryId) {
      delete updateEventTemplateDto.eventCategoryId;
    }
    return this.prisma.eventTemplate.update({
      where: { id },
      data: updateEventTemplateDto
    })
  }

  remove(id: string) {
    return this.prisma.eventTemplate.delete({ where: { id } })
  }
}
