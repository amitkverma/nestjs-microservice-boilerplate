import { Injectable } from '@nestjs/common';
import { CreateEventTemplateDto } from './dto/create-event-template.dto';
import { UpdateEventTemplateDto } from './dto/update-event-template.dto';
import { PrismaService } from '@spotlyt-backend/database';
import { Prisma } from '@prisma/client';

@Injectable()
export class EventTemplateService {
  constructor(private prisma: PrismaService) { }

  async create(createEventTemplateDto: CreateEventTemplateDto) {
    return this.prisma.eventTemplate.create({ data: createEventTemplateDto })
  }

  async findAll(params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EventTemplateWhereUniqueInput;
    where?: Prisma.EventTemplateWhereInput;
    orderBy?: Prisma.EventTemplateOrderByWithRelationInput;
  }) {
    return this.prisma.eventTemplate.findMany(params);
  }

  async count(where?: Prisma.EventTemplateWhereInput) {
    return { count: await this.prisma.eventTemplate.count({ where }) }
  }

  async findOne(id: string) {
    return this.prisma.eventTemplate.findFirst({
      where: { id }, include: {
        eventCategory: {
          include: {
            eventType: true,
          }
        },
        medias: true
      }
    });
  }

  async update(id: string, updateEventTemplateDto: UpdateEventTemplateDto) {
    if (updateEventTemplateDto.eventCategoryId) {
      delete updateEventTemplateDto.eventCategoryId;
    }
    return this.prisma.eventTemplate.update({
      where: { id },
      data: updateEventTemplateDto
    })
  }

  async remove(id: string) {
    return this.prisma.eventTemplate.delete({ where: { id } })
  }
}
