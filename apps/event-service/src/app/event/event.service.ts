import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@spotlyt-backend/database';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UpdateEventStatusDto } from './dto/update-event-status.dto';

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) { }

  async create(createEventDto: CreateEventDto) {
    return this.prisma.event.create({ data: { ...createEventDto, eventStatusName: 'Pending' } });
  }

  async findAll(tenantId: string, params?: {
    skip?: number;
    take?: number;
    cursor?: Prisma.EventWhereUniqueInput;
    where?: Prisma.EventWhereInput;
    orderBy?: Prisma.EventOrderByWithRelationInput;
  }) {
    return this.prisma.event.findMany({
      ...params, where: {
        ...params.where,
        tenantId: tenantId
      }
    });
  }

  async count(tenantId: string, where?: Prisma.EventWhereInput) {
    return {
      count: await this.prisma.event.count({
        where: {
          ...where,
          tenantId: tenantId
        }
      })
    }
  }

  async findOne(id: string) {
    return this.prisma.event.findFirst({
      where: { id }, include: {
        attachments: true,
        audiences: true,
        eventTemplate: {
          include: {
            eventCategory: true
          }
        },
        notes: true,
        eventStatus: true,
        participants: true
      }
    });
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    if (updateEventDto.tenantId) {
      delete updateEventDto.tenantId;
    }
    return this.prisma.event.update({ where: { id }, data: updateEventDto })
  }

  async remove(id: string) {
    return this.prisma.event.delete({ where: { id } })
  }

  updateEventStatus(updateEventStatus: UpdateEventStatusDto) {
    return this.prisma.event.update({
      where: { id: updateEventStatus.eventId }, data: {
        eventStatusName: updateEventStatus.eventStatus
      }
    })

  }

  addEventNote() { }
  removeEventNote(noteId: string) { }

}
