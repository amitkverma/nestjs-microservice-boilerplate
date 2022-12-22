import { Tenant } from '@prisma/client';
import axios from 'axios';

interface IMailModoListItem {
  id?: string;
  name?: string;
  created_at?: Date;
  contacts_count?: number;
  type?: string;
  last_updated_at?: Date;
}

export class MailModoCampaign {
  constructor(
    private tenant: Tenant,
    private campaignId: string,
    private teamName: string
  ) {}
  async run() {
    const listData = await axios.get(
      `https://api.mailmodo.com/api/v1/getAllContactLists`,
      {
        headers: {
          mmApiKey: '6688H8P-RVDMRC7-GZ32ZJQ-TKPPRQ5',
        },
      }
    );
    const listInfos: IMailModoListItem[] = listData?.data?.listDetails;
    if (!listInfos) {
      throw new Error(`List Data Invalid`);
    }
    const listInfo = listInfos?.find(
      (list) => list.name === `${this.tenant.name}__${this.teamName}`
    );
    console.log(`listInfo: `, listInfo);
    await axios
      .post(
        `https://api.mailmodo.com/api/v1/bulktriggerCampaign/${this.campaignId}`,
        {
          listId: listInfo?.id,
        },
        {
          headers: {
            mmApiKey: '6688H8P-RVDMRC7-GZ32ZJQ-TKPPRQ5',
            'Content-Type': 'application/json',
          },
        }
      )
      .then((res) => {
        console.log(`res: `, res.data);
      })
      .catch((err) => {
        console.log(`errr: `, err.response);
      });
  }
}
