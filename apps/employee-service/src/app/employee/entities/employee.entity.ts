import {Employee as EmployeeModel, EmployeeStatus, Gender} from '@prisma/client'

export class Employee implements EmployeeModel{
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
    tenantId: string;
    createdOn: Date;
    createdBy: string;
    modifiedBy: string;
    modifiedOn: Date;
}
