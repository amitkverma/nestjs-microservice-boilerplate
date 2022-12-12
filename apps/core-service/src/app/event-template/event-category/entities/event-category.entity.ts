import {EventCategory as EventCategoryModel} from '@prisma/client'

export class EventCategory implements EventCategoryModel{
    id: string;
    name: string;
    eventTypeId: string;
}
