import { Employee as EmployeeModel, EmployeeStatus, Gender } from '@prisma/client'

export class EmployeeEntity implements EmployeeModel {
    id: string;
    firstName: string;
    middleName: string;
    lastName: string;
    status: EmployeeStatus;
    email: string;
    phone: string;
    gender: Gender;
    dob: Date;
    picture: string;
    hiredOn: Date;
    isMarried: boolean;
    weddingAniversary: Date;
    companyTitleId: string;
    teamId: string;
    tenantId: string;
    createdOn: Date;
    createdBy: string;
    modifiedBy: string;
    modifiedOn: Date; 
}

export interface IEmployee extends Partial<EmployeeEntity> {}