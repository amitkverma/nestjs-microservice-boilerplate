import { Status, Tenant } from "@prisma/client";
export class TenantEntity implements Tenant {
    id: string;
    name: string;
    status: Status;
    website: string;
    logoUrl: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    createdOn: Date;
    modifiedBy: string;
    modifiedOn: Date;
}
