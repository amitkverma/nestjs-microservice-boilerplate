import { Role } from "@prisma/client";

export class RoleEntity implements Role {
    id: string;
    name: string;
    description: string;
    createdOn: Date;
    modifiedBy: string;
    modifiedOn: Date;
}
