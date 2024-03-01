import axios from 'axios';
import AppConfig from 'src/common/appConfig';
import {
  fetchPushNotificationEvents,
  updatePushNotificationEvent,
} from './pushNotificationEvents';

jest.mock('axios');

const dispatch = jest.fn();

const accessToken = 'access-token';
const option = {};
const currentPageSize = 50;
const templatesSize = 1;

describe('fetchPushNotificationEvents', () => {
  it('should successfull', async () => {
    const fetchPushNotificationEvnts = {
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

    axios.get = jest.fn().mockResolvedValue(fetchPushNotificationEvnts);

    const result = fetchPushNotificationEvents('access-token', 1, 1)(dispatch);

    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.pushNotificationEvents}?size=${currentPageSize}&start=${templatesSize}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('should fail', async () => {
    const fetchPushNotificationEvnts = {
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

    axios.get = jest.fn().mockRejectedValueOnce(fetchPushNotificationEvnts);

    fetchPushNotificationEvents('access-token', 1, 1)(dispatch);

    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.pushNotificationEvents}?size=${currentPageSize}&start=${templatesSize}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('should successfull', async () => {
    const updatePushNotificationEvnt = {
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

    axios.put = jest.fn().mockResolvedValue(updatePushNotificationEvnt);

    updatePushNotificationEvent({}, 'access-token')(dispatch);

    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.pushNotificationEventsUpdate}`,
      {
        actions: undefined,
        app_name: undefined,
        body: undefined,
        event_name: undefined,
        id: undefined,
        image: undefined,
        target: undefined,
        title: undefined,
        triggers_limit: undefined,
        updated: undefined,
        updated_by: undefined,
      },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('should fail', async () => {
    const fetchPushNotificationEvnts = {
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

    axios.put = jest.fn().mockRejectedValueOnce(fetchPushNotificationEvnts);

    updatePushNotificationEvent({}, 'access-token')(dispatch);

    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.pushNotificationEventsUpdate}`,
      {
        actions: undefined,
        app_name: undefined,
        body: undefined,
        event_name: undefined,
        id: undefined,
        image: undefined,
        target: undefined,
        title: undefined,
        triggers_limit: undefined,
        updated: undefined,
        updated_by: undefined,
      },

      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });
});
