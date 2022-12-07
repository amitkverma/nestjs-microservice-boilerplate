import { CompanyTitle as CompanyTitleModel } from '@prisma/client'

export class Company implements CompanyTitleModel {
    id: string;
    name: string;
    description: string | null;
}
