import {EventStatus as EventStatusModel} from '@prisma/client'
export class EventStatus implements EventStatusModel {
    id: string;
    name: string;
}