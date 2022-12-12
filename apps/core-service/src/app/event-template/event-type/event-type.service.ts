import { Injectable } from '@nestjs/common';
import { CreateEventTypeDto } from './dto/create-event-type.dto';
import { UpdateEventTypeDto } from './dto/update-event-type.dto';
import { PrismaService } from '@spotlyt-backend/database';


@Injectable()
export class EventTypeService {
  constructor(private prisma: PrismaService) { }

  create(createEventTypeDto: CreateEventTypeDto) {
    return this.prisma.eventType.create({ data: createEventTypeDto });
  }

  findAll() {
    return this.prisma.eventType.findMany();
  }

  findOne(id: string) {
    return this.prisma.eventType.findFirst({ where: { id } });
  }

  update(id: string, updateEventTypeDto: UpdateEventTypeDto) {
    return this.prisma.eventType.update({ where: { id }, data: updateEventTypeDto });

  }

  remove(id: string) {
    return this.prisma.eventType.delete({ where: { id } });
  }
}
