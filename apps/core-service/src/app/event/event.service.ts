import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '@spotlyt-backend/database';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { UpdateEventStatusDto } from './dto/update-event-status.dto';
import { CreateEventNoteDto, UpdateEventNoteDto } from './dto/create-note.dto';
import { CreateEventAttachmentDto } from './dto/create-attachment.dto';
import { CreateEventAudianceDto } from './dto/create-audiance.dto';
import { CreateEventParticipantDto } from './dto/create-event-participant.dto';
import {
  Event,
  Note,
  Attachment,
  Participant,
  EventTemplate,
  Audience,
  EventStatus,
} from '@prisma/client';

type Modify<T, R> = Omit<T, keyof R> & R;
type ResolvedNotes = Modify<Note, { user?: object }>;
type ResolvedParticipants = Modify<Participant, { user?: object }>;
const UserSelectFeilds = {
  email: true,
  firstName: true,
  lastName: true,
  id: true,
};
interface ResolvedEvent
  extends Modify<
    Event,
    {
      notes: ResolvedNotes[];
      participants?: ResolvedParticipants[];
      attachments: Attachment[];
      eventTemplate: EventTemplate;
      audiences: Audience[];
      eventStatus: EventStatus;
    }
  > {}

@Injectable()
export class EventService {
  constructor(private prisma: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    return this.prisma.event.create({
      data: { ...createEventDto, eventStatusName: 'Pending' },
    });
  }

  async findOne(id: string) {
    const event = await this.prisma.event.findFirst({
      where: { id },
      include: {
        attachments: true,
        audiences: true,
        eventTemplate: {
          include: {
            eventCategory: {
              include: {
                eventType: true,
              },
            },
          },
        },
        notes: true,
        eventStatus: true,
        participants: true,
      },
    });
    const resolvedEvent: ResolvedEvent = {
      ...event,
    };

    // Notes User
    const notesUserIDs = [...new Set(event.notes.map((note) => note.userId))];
    const notesUsers = await this.prisma.user.findMany({
      where: {
        id: {
          in: notesUserIDs,
        },
      },
      select: {
        ...UserSelectFeilds,
        tenant: {
          select: {
            name: true,
          },
        },
        role: {
          select: {
            name: true,
          },
        },
      },
    });
    const notesUserMapper = {};
    notesUsers.map((user) => (notesUserMapper[user.id] = user));

    for (let index = 0; index < resolvedEvent?.notes?.length; index++) {
      resolvedEvent.notes[index] = {
        ...resolvedEvent?.notes?.[index],
        user: notesUserMapper?.[resolvedEvent?.notes?.[index]?.userId] ?? null,
      };
    }

    // Participants Users
    const participantsUserIDs = [
      ...new Set(event.participants.map((participant) => participant.userId)),
    ];
    const participantUsers = await this.prisma.user.findMany({
      where: {
        id: {
          in: participantsUserIDs,
        },
      },
      select: UserSelectFeilds,
    });
    const participantsUserMapper = {};
    participantUsers.map((user) => (participantsUserMapper[user.id] = user));

    for (let index = 0; index < resolvedEvent?.participants?.length; index++) {
      resolvedEvent.participants[index] = {
        ...resolvedEvent.participants?.[index],
        user: participantsUserMapper?.[
          resolvedEvent?.participants?.[index]?.userId
        ] ?? null,
      };
    }

    return resolvedEvent;
  }

  async getAllEventStatus() {
    return this.prisma.eventStatus.findMany();
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    if (updateEventDto.tenantId) {
      delete updateEventDto.tenantId;
    }
    return this.prisma.event.update({ where: { id }, data: updateEventDto });
  }

  async remove(id: string) {
    return this.prisma.event.delete({ where: { id } });
  }

  async updateEventStatus(id: string, updateEventStatus: UpdateEventStatusDto) {
    // console.log(await this.prisma.event.findFirst({ where: { id } }));
    return this.prisma.event.update({
      where: { id },
      data: {
        eventStatusName: updateEventStatus.eventStatus,
      },
    });
  }

  async addEventNote(eventNoteDto: CreateEventNoteDto) {
    return this.prisma.note.create({ data: eventNoteDto });
  }
  async editEventNote(id: string, eventUpdateNoteDto: UpdateEventNoteDto) {
    return this.prisma.note.update({
      where: { id },
      data: {
        text: eventUpdateNoteDto.text,
      },
    });
  }
  async removeEventNote(id: string) {
    return this.prisma.note.delete({ where: { id } });
  }

  async attachEventDocument(attachmentDto: CreateEventAttachmentDto) {
    return this.prisma.attachment.create({ data: attachmentDto });
  }
  async removeAttachedEventDocument(id: string) {
    return this.prisma.attachment.delete({ where: { id } });
  }

  async addEventAudience(audianceDto: CreateEventAudianceDto) {
    const audiance = await this.prisma.audience.findFirst({
      where: {
        eventId: audianceDto.eventId,
        teamName: audianceDto.teamName,
      },
    });
    if (!audiance) {
      throw new HttpException(`Audience Already Exist`, HttpStatus.CONFLICT);
    }

    return this.prisma.audience.create({ data: audianceDto });
  }
  async removeEventAudience(eventId: string, teamName: string) {
    const audiance = await this.prisma.audience.findFirst({
      where: {
        eventId,
        teamName,
      },
    });
    if (!audiance) {
      throw new HttpException(`Audience Not Found`, HttpStatus.NOT_FOUND);
    }
    return this.prisma.audience.delete({ where: { id: audiance.id } });
  }

  async addEventParticipant(eventParticipantDto: CreateEventParticipantDto) {
    const participant = await this.prisma.participant.findFirst({
      where: {
        eventId: eventParticipantDto.eventId,
        userId: eventParticipantDto.userId,
      },
    });
    if (participant) {
      throw new HttpException(`Participant Already Exist`, HttpStatus.CONFLICT);
    }
    return this.prisma.participant.create({ data: eventParticipantDto });
  }
  async removeEventParticipant(eventId: string, userId: string) {
    const participant = await this.prisma.participant.findFirst({
      where: {
        eventId,
        userId,
      },
    });
    if (!participant) {
      throw new HttpException(`Participant Not Found`, HttpStatus.NOT_FOUND);
    }
    return this.prisma.participant.delete({ where: { id: participant.id } });
  }

  async getKanban(tenantId: string) {
    return this.prisma.eventStatus.findMany({
      include: {
        Event: {
          where: { tenantId },
          include: {
            eventTemplate: true,
            notes: true,
            eventStatus: true,
          },
        },
      },
    });
  }
}
