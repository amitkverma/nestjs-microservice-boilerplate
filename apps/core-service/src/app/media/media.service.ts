import { Injectable } from '@nestjs/common';
import { CreateMediaDto } from './dto/create-media.dto';
import { PrismaService } from '@spotlyt-backend/database';
import {EventCategory, EventEmployeeMediaListItem, EventMediaStatus, Prisma} from '@prisma/client'


interface ICategoriedEventData {
  name: string;
  id: string;
  image: string;
  startAt: Date;
  endAt: Date;
  eventTemplate: {
      eventCategory: EventCategory;
  };
  stats?: Object;
  eventEmployeeMedia: {
      id: string;
      status: EventMediaStatus;
      medias: EventEmployeeMediaListItem[];
      employeeId: string;
      _count: Prisma.EventEmployeesMediaCountOutputType;
  }[];
}[]

@Injectable()
export class MediaService {
  constructor(private prisma: PrismaService) {}

  async create(createMediaDto: CreateMediaDto) {
    const { medias, ...mediaPayloadDto } = createMediaDto;
    const eventMedias = await this.prisma.eventEmployeesMedia.create({
      data: mediaPayloadDto,
    });

    for (const media of medias) {
      await this.prisma.eventEmployeeMediaListItem.create({
        data: {
          ...media,
          eventEmployeeMediaId: eventMedias.id,
        },
      });
    }
    return eventMedias;
  }

  findAll() {
    return `Unimplemented`;
  }

  updateEmployeeMediaStatus(id: string, status: EventMediaStatus) {
    return this.prisma.eventEmployeesMedia.update({
      where: {id},
      data: {
        status
      }
    })
  }

  findAllMediasOfAEventBasedOnStatus(eventId: string, status: EventMediaStatus, paginationParams: {take: number, skip: number}){
    return this.prisma.eventEmployeesMedia.findMany({
      where: {
        eventId,
        status
      },
      include: {
        employee: true,
        medias: true,
      },
      take: paginationParams.take,
      skip: paginationParams.skip
    })
  }

  getEventStats(event: ICategoriedEventData) {
    const mediasStatsCount = new Map<string, number>();
    for(const media of event.eventEmployeeMedia){
      if(mediasStatsCount.get(media.status)){
        mediasStatsCount.set(media.status, (mediasStatsCount.get(media.status) +  1));
        continue;
      }
      mediasStatsCount.set(media.status, 1);
    }
    event.stats = Object.fromEntries(mediasStatsCount);
    return event;
  }

  async eventCategoryInfoMedias(tenantId: string) {
    const eventData: ICategoriedEventData[] = await this.prisma.event.findMany({
      where: {
        tenantId
      },
      select: {
        id: true,
        name: true,
        image: true,
        startAt: true,
        endAt: true,
        eventTemplate: {
          select: {eventCategory: true}
        },
        eventEmployeeMedia: {
          select: {
            id: true,
            status: true,
            employeeId: true,
            _count: true,
            medias: true
          }
        }
      }
    });
    const result = new Map<string, Array<ICategoriedEventData>>();
    for(const event of eventData){
      if(result.get(event.eventTemplate.eventCategory.name)){
        result.set(event.eventTemplate.eventCategory.name, [ 
          ...result.get(event.eventTemplate.eventCategory.name),
          this.getEventStats(event)
        ]);
        continue;
      }
      result.set(event.eventTemplate.eventCategory.name, [ 
        this.getEventStats(event)
      ])
    }
    return Object.fromEntries(result);
  }

  async findOne(id: string) {
    return this.prisma.eventEmployeesMedia.findFirst({
      where: { id },
      select: {
        event: true,
        employee: true,
        medias: true,
        status: true,
        createdOn: true,
        id: true,
      },
    });
  }

  async remove(id: string) {
    return this.prisma.eventEmployeesMedia.delete({ where: { id } });
  }
}