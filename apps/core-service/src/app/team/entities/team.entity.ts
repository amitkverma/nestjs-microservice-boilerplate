import { Team as TeamModel } from '@prisma/client'

export class TeamEntity implements TeamModel {
    id: string;
    name: string;
    description: string;
    isRemote: boolean;
    tenantId: string;
}
