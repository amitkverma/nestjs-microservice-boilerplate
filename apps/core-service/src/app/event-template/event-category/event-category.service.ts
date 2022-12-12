import { Injectable } from '@nestjs/common';
import { CreateEventCategoryDto } from './dto/create-event-category.dto';
import { UpdateEventCategoryDto } from './dto/update-event-category.dto';
import { PrismaService } from '@spotlyt-backend/database';

@Injectable()
export class EventCategoryService {

  constructor(private prisma: PrismaService) { }

  create(createEventCategoryDto: CreateEventCategoryDto) {
    return this.prisma.eventCategory.create({ data: createEventCategoryDto })
  }

  findAll() {
    return this.prisma.eventCategory.findMany();
  }

  findOne(id: string) {
    return this.prisma.eventCategory.findFirst({ where: { id }, include: { eventType: true } });
  }

  update(id: string, updateEventCategoryDto: UpdateEventCategoryDto) {
    return this.prisma.eventCategory.update({ where: { id }, data: updateEventCategoryDto });
  }

  remove(id: string) {
    return this.prisma.eventCategory.delete({ where: { id } })
  }
}
