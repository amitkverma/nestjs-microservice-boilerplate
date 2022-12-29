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
      name: string;
      description: string;
      image: string;
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
    const mediasBulkData = medias.map(item => ({...item, eventEmployeeMediaId: eventMedias.id}));

    await this.prisma.eventEmployeeMediaListItem.createMany({
      data: mediasBulkData
    });
   
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

  async findAllMediasOfAEventBasedOnStatusCount(eventId: string, status: EventMediaStatus){
    const count = await this.prisma.eventEmployeesMedia.count({
      where: {
        eventId,
        status
      }
    });
    return {count}
  }

  async findAllMediasOfAEventBasedOnStatus(eventId: string, status: EventMediaStatus, paginationParams: {take: number, skip: number}){
    const eventData = await this.prisma.event.findFirst({
      where: {
        id: eventId
      },
      include: {
        eventTemplate: true,
        eventStatus: true
      }
    });
    const eventMedias = await this.prisma.eventEmployeesMedia.findMany({
      where: {
        eventId,
        status
      },
      include: {
        employee: true,
        medias: true,
        event: {
          select: {
            name: true,
            description: true,
            image: true,
            eventTemplate: {
              select: {
                name: true,
                description: true,
                image: true,
                eventCategory: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        }
      },
      take: paginationParams.take,
      skip: paginationParams.skip
    });
    return {
      event: eventData,
      medias: eventMedias
    }
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
    event.eventEmployeeMedia = [];
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
          select: {eventCategory: true, name: true, description: true, image: true}
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
