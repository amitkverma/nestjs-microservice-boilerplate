import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '@spotlyt-backend/database';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UpdateEventStatusDto } from './dto/update-event-status.dto';
import { CreateEventNoteDto, UpdateEventNoteDto } from './dto/create-note.dto';
import { CreateEventAttachmentDto } from './dto/create-attachment.dto';
import { CreateEventAudianceDto } from './dto/create-audiance.dto';
import { CreateEventParticipantDto } from './dto/create-event-participant.dto';

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

  async getAllEventStatus(){
    return this.prisma.eventStatus.findMany();
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

  async updateEventStatus(id: string, updateEventStatus: UpdateEventStatusDto) {
    console.log(await this.prisma.event.findFirst({ where: { id } }))
    return this.prisma.event.update({
      where: { id }, data: {
        eventStatusName: updateEventStatus.eventStatus
      }
    })

  }

  async addEventNote(eventNoteDto: CreateEventNoteDto) {
    return this.prisma.note.create({ data: eventNoteDto });
  }
  async editEventNote(id: string, eventUpdateNoteDto: UpdateEventNoteDto) {
    return this.prisma.note.update({
      where: { id },
      data: {
        text: eventUpdateNoteDto.text
      }
    });
  }
  async removeEventNote(id: string) {
    return this.prisma.note.delete({ where: { id } })
  }


  async attachEventDocument(attachmentDto: CreateEventAttachmentDto) {
    return this.prisma.attachment.create({ data: attachmentDto });
  }
  async removeAttachedEventDocument(id: string) {
    return this.prisma.attachment.delete({ where: { id } });
  }

  async addEventAudience(audianceDto: CreateEventAudianceDto) {
    return this.prisma.audience.create({ data: audianceDto })
  }
  async removeEventAudience(id: string) {
    return this.prisma.audience.delete({ where: { id } })
  }


  async addEventParticipant(eventParticipantDto: CreateEventParticipantDto) {
    return this.prisma.participant.create({ data: eventParticipantDto })
  }
  async removeEventParticipant(id: string) {
    return this.prisma.participant.delete({ where: { id } })
  }


}
