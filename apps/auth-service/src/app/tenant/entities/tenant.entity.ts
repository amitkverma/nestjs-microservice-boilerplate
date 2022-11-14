import { Status, Tenant } from '@prisma/client';

export class TenantEntity implements Tenant {
    id: number;
    name: string;
    status: Status;
    address: string;
    state: string;
    zip: string;
    city: string;
    country: string;
    primaryContactEmail: string;
    allowedDomain: string;
    tenantType: string;
    createdAt: Date;
    modifiedAt: Date;
    createdBy: string;
    modifiedBy: string;
}
