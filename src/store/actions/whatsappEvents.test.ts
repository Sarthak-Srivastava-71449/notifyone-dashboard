import axios from 'axios';
import AppConfig from 'src/common/appConfig';
import { fetchWhatsAppEvents, updateWhatsAppEvent } from './whatsappEvents';

jest.mock('axios');

const dispatch = jest.fn();

const currentPageSize = 50;
const templatesSize = 1;
const accessToken = 'access-token';

describe('fetchWhatsAppEvents', () => {
  it('should successfull', async () => {
    const fetchWhatsAppEvnts = {
      result: {
        items: [
          {
            code: 'WALLETS',
            group_offer: '',
            group_title: '',
            icon_url: `https://${AppConfig.imageHost}/marketing/vvew3rcvwfjrhknifj1z.png`,
            rank: 1,
            subtitle: '',
            title: 'WALLETS',
          },
        ],
        payment_item: 'WALLETS',
        payment_item_type: 'PAYMENT_GROUP',
        source: 'PHARMACY',
      },
      success: true,
    };

    axios.get = jest.fn().mockResolvedValue(fetchWhatsAppEvnts);

    fetchWhatsAppEvents('access-token', 1, 1)(dispatch);

    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.whatsAppEvents}?size=${currentPageSize}&start=${templatesSize}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('should fail', async () => {
    const fetchWhatsAppEvnts = {
      result: {
        items: [
          {
            code: 'WALLETS',
            group_offer: '',
            group_title: '',
            icon_url: `https://${AppConfig.imageHost}/marketing/vvew3rcvwfjrhknifj1z.png`,
            rank: 1,
            subtitle: '',
            title: 'WALLETS',
          },
        ],
        payment_item: 'WALLETS',
        payment_item_type: 'PAYMENT_GROUP',
        source: 'PHARMACY',
      },
      success: true,
    };

    axios.get = jest.fn().mockRejectedValueOnce(fetchWhatsAppEvnts);

    fetchWhatsAppEvents('access-token', 1, 1)(dispatch);

    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.whatsAppEvents}?size=${currentPageSize}&start=${templatesSize}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('should successfull', async () => {
    const updateWhatsAppEvnts = {
      result: {
        items: [
          {
            code: 'WALLETS',
            group_offer: '',
            group_title: '',
            icon_url: `https://${AppConfig.imageHost}/marketing/vvew3rcvwfjrhknifj1z.png`,
            rank: 1,
            subtitle: '',
            title: 'WALLETS',
          },
        ],
        payment_item: 'WALLETS',
        payment_item_type: 'PAYMENT_GROUP',
        source: 'PHARMACY',
      },
      success: true,
    };

    axios.put = jest.fn().mockResolvedValue(updateWhatsAppEvnts);

    updateWhatsAppEvent({}, 'access-token')(dispatch);

    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.whatsAppEventsUpdate}`,

      {
        app_name: undefined,
        event_name: undefined,
        template: undefined,
        trigger_limit: undefined,
      },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('should fail', async () => {
    const updateWhatsAppEvnts = {
      result: {
        items: [
          {
            code: 'WALLETS',
            group_offer: '',
            group_title: '',
            icon_url: `https://${AppConfig.imageHost}/marketing/vvew3rcvwfjrhknifj1z.png`,
            rank: 1,
            subtitle: '',
            title: 'WALLETS',
          },
        ],
        payment_item: 'WALLETS',
        payment_item_type: 'PAYMENT_GROUP',
        source: 'PHARMACY',
      },
      success: true,
    };

    axios.put = jest.fn().mockRejectedValueOnce(updateWhatsAppEvnts);

    updateWhatsAppEvent({}, 'access-token')(dispatch);

    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.whatsAppEventsUpdate}`,

      {
        app_name: undefined,
        event_name: undefined,
        template: undefined,
        trigger_limit: undefined,
      },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });
});
