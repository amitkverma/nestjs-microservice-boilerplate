import {EventTemplateMedia} from '@prisma/client';

export class EventMedia implements EventTemplateMedia {
    id: string;
    name: string;
    mimeType: string;
    key: string;
    url: string;
    eventId: string;
    
}
