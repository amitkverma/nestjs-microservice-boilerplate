import {Event as EventModel} from '@prisma/client'

export class Event implements EventModel{
    id: string;
    name: string;
    description: string;
    image: string;
    eventTemplateId: string;
    eventStatusName: string;
    startAt: Date;
    location: string;
    endAt: Date;
    isActive: boolean;
    isNotificationOn: boolean;
    allowPerformers: boolean;
    allowRewards: boolean;
    tenantId: string;
}
