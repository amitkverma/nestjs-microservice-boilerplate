import { Injectable } from '@nestjs/common';
import { CreateEventMediaDto } from './dto/create-event-media.dto';
import { UpdateEventMediaDto } from './dto/update-event-media.dto';
import { PrismaService } from '@spotlyt-backend/database';

@Injectable()
export class EventMediasService {
  constructor(private prisma: PrismaService) { }

  create(createEventMediaDto: CreateEventMediaDto) {
    return this.prisma.eventTemplateMedia.create({data: createEventMediaDto});
  }

  findAll() {
    return `Not Implemented`;
  }

  findOne(id: string) {
    return this.prisma.eventTemplate.findFirst({where: {id}});
  }

  update(id: string, updateEventMediaDto: UpdateEventMediaDto) {
    if(updateEventMediaDto.eventId) {
      delete updateEventMediaDto.eventId;
    }
    return this.prisma.eventTemplateMedia.update({where: {id}, data: updateEventMediaDto});
  }

  remove(id: string) {
    return this.prisma.eventTemplateMedia.delete({where: {id}});
  }
}
