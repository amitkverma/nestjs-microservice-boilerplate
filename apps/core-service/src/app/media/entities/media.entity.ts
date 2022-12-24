import {EventEmployeesMedia, EventMediaStatus, EventEmployeeMediaListItem} from '@prisma/client';

export class Media implements EventEmployeesMedia{
    id: string;
    eventId: string;
    employeeId: string;
    medias: EventEmployeeMediaListItem[];
    status: EventMediaStatus;
    createdBy: string;
    createdOn: Date;
    modifiedBy: string;
    modifiedOn: Date;
}
