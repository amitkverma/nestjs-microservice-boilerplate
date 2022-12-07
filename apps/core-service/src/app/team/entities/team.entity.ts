import { Team as TeamModel } from '@prisma/client'

export class TeamEntity implements TeamModel {
    id: string;
    name: string;
    description: string | null;
    isRemote: boolean | null;

}
