import { EventTemplate as EventTemplateModel, Prisma } from '@prisma/client';


export class EventTemplate implements EventTemplateModel{
    id: string;
    name: string;
    description: string;
    image: string;
    instruction: string;
    howTos: string;
    agenda: Prisma.JsonValue;
    eventCategoryId: string;
}
