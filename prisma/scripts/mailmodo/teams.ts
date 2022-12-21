import { PrismaClient, Employee } from '@prisma/client';
import axios from 'axios';
interface IMailModoContact {
  email: string;
  data: {
    first_name: string;
    last_name: string;
    name: string;
    gender: string;
    birthday: Date | null;
    phone: string | null;
    designation: string | null;
    company: string;
  };
}

export class MailModoTeams {
  constructor(
    private teamName: string,
    private employees: Employee[],
    private compnayName: string
  ) {}
  async syncContacts() {
    console.log(`Syncing Contacts...`);
    const uploadBatchUrl = `https://api.mailmodo.com/api/v1/addToList/batch`;
    const values: IMailModoContact[] = [];
    for (const employee of this.employees) {
      values.push(this.mailModoMapper(employee));
    }
    await axios
      .post(
        uploadBatchUrl,
        {
          listName: `${this.compnayName}__${this.teamName}`,
          values,
        },
        {
          headers: {
            mmApiKey: '6688H8P-RVDMRC7-GZ32ZJQ-TKPPRQ5',
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch((err: Error) => {
        console.log(
          `Syning Failed For`,
          `${this.compnayName}__${this.teamName}`
        );
        console.log(`Employees: `, this.employees);
      });
  }

  mailModoMapper(employee: Employee) {
    return {
      email: employee.email,
      data: {
        first_name: employee.firstName,
        last_name: employee.lastName,
        name: `${employee.firstName} ${employee.lastName}`,
        gender: employee.gender.toString(),
        birthday: employee.dob,
        phone: employee.phone,
        designation: employee.companyTitleId,
        company: this.compnayName,
      },
    };
  }
}
