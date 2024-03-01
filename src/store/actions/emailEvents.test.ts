import axios from 'axios';
import AppConfig from 'src/common/appConfig';
import { EVENT_FETCH_LIMIT } from 'src/common/constants';

import {
  fetchallEmailEvents,
  fetchSingleEmailEvent,
  previewEmailEvent,
  previewEmailTemplate,
  updateEmailEvent,
} from './emailEvents';

jest.mock('axios');

const dispatch = jest.fn();

const accessToken = 'access-token';
const option = {};
const currentPageSize = 10;
const templatesSize = 100;

describe('fetchSingleEmailEvent', () => {
  it('should successfull', async () => {
    const fetchEmailEvent = {
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

    axios.get = jest.fn().mockResolvedValue(fetchEmailEvent);

    fetchSingleEmailEvent('access-token', {
      eventDetail: '',
    })(dispatch);

    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.emailEventsUpdate}?id=${option}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('should fail', async () => {
    const fetchEmailEvent = {
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

    axios.get = jest.fn().mockRejectedValueOnce(fetchEmailEvent);

    fetchSingleEmailEvent('access-token', {
      eventDetail: '',
    })(dispatch);

    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.emailEventsUpdate}?id=${option}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('should successfull', async () => {
    const allEmailEvents = {
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

    axios.get = jest.fn().mockResolvedValue(allEmailEvents);

    fetchallEmailEvents(
      'access-token',
      {
        currentPageSize: '',
      },
      {
        templatesSize: '',
      }
    )(dispatch);

    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.emailEvents}?size=[object Object]&start=[object Object]`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('should fail', async () => {
    const allEmailEvents = {
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

    axios.get = jest.fn().mockRejectedValueOnce(allEmailEvents);

    const result = fetchallEmailEvents(
      'access-token',
      {
        currentPageSize: '',
      },
      {
        templatesSize: '',
      }
    )(dispatch);

    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.emailEvents}?size=[object Object]&start=[object Object]`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('should successfull', async () => {
    const previewEmailTemp = {
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

    axios.put = jest.fn().mockResolvedValue(previewEmailTemp);

    const result = previewEmailTemplate({}, 'access-token')(dispatch);

    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.previewEmailEvent}`,
      {
        content: undefined,
        description: undefined,
        event_id: undefined,
        id: undefined,
        includes: undefined,
        name: undefined,
        subject: undefined,
        updated_by: undefined,
      },
      { headers: { Authorization: 'Bearer access-token' } }
    );
  });

  it('should fail', async () => {
    const previewEmailTemp = {
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

    axios.put = jest.fn().mockRejectedValueOnce(previewEmailTemp);

    previewEmailTemplate({}, 'access-token')(dispatch);

    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.previewEmailEvent}`,
      {
        content: undefined,
        description: undefined,
        event_id: undefined,
        id: undefined,
        includes: undefined,
        name: undefined,
        subject: undefined,
        updated_by: undefined,
      },
      { headers: { Authorization: 'Bearer access-token' } }
    );
  });

  it('should successfull', async () => {
    const previewEmailEvnt = {
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

    axios.put = jest.fn().mockResolvedValue(previewEmailEvnt);

    const result = previewEmailEvent({}, 'access-token')(dispatch);

    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.previewEmailEvent}`,
      {
        content: undefined,
        description: undefined,
        event_id: undefined,
        id: undefined,
        includes: undefined,
        name: undefined,
        subject: undefined,
        updated_by: undefined,
      },
      { headers: { Authorization: 'Bearer access-token' } }
    );
  });

  it('should fail', async () => {
    const previewEmailEvnt = {
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

    axios.put = jest.fn().mockRejectedValueOnce(previewEmailEvnt);

    previewEmailEvent({}, 'access-token')(dispatch);

    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.previewEmailEvent}`,
      {
        content: undefined,
        description: undefined,
        event_id: undefined,
        id: undefined,
        includes: undefined,
        name: undefined,
        subject: undefined,
        updated_by: undefined,
      },
      { headers: { Authorization: 'Bearer access-token' } }
    );
  });

  it('should successfull', async () => {
    const updateEmailEvnt = {
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

    axios.put = jest.fn().mockResolvedValue(updateEmailEvnt);

    updateEmailEvent({}, 'access-token')(dispatch);

    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.previewEmailEvent}`,
      {
        content: undefined,
        description: undefined,
        event_id: undefined,
        id: undefined,
        includes: undefined,
        name: undefined,
        subject: undefined,
        updated_by: undefined,
      },
      { headers: { Authorization: 'Bearer access-token' } }
    );
  });

  it('should fail', async () => {
    const updateEmailEvnt = {
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

    axios.put = jest.fn().mockRejectedValueOnce(updateEmailEvnt);

    updateEmailEvent({}, 'access-token')(dispatch);

    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.previewEmailEvent}`,
      {
        content: undefined,
        description: undefined,
        event_id: undefined,
        id: undefined,
        includes: undefined,
        name: undefined,
        subject: undefined,
        updated_by: undefined,
      },
      { headers: { Authorization: 'Bearer access-token' } }
    );
  });
});
