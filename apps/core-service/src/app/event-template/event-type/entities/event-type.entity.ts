import { EventType as EventTypeModel } from '@prisma/client';

export class EventType implements EventTypeModel {
    id: string;
    name: string;
}
