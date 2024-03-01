import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AppConfig from 'src/common/appConfig';
import {
  mockInactiveNodeLinks,
  mockRavenNodes,
  mockSendNodeLink,
} from 'src/common/renderWithProvider/constants';
import { fetchRavenNodeActionEventsRequest } from '../ravenActionNodeEvents';
import {
  fetchRavenNodes,
  fetchRavenNodeEventsSuccess,
  sendNodeLink,
  sendRavenNodeLinkRequest,
  sendRavenNodeLinkSuccess,
  fetchRavenInactiveNodeLinks,
  fetchRavenInactiveNodeLinksRequest,
  fetchRavenInactiveNodeLinksSuccess,
} from '../ravenNodeEvents';

jest.mock('axios');
const mockStore = configureStore([thunk]);
const accessToken = 'access-token';
const dispatch = jest.fn();
const currentPageSize = 0;
const pageStart = 10;
const payload = {};

// Raven Node Events Test Suite

describe('ravenNode events Test Suite', () => {
  test('ravenNode events should successfull', async () => {
    axios.get = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        data: mockRavenNodes,
      })
    );
    const store = mockStore({});
    return store
      .dispatch(<any>fetchRavenNodes(accessToken, currentPageSize, pageStart))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(fetchRavenNodeActionEventsRequest());
        expect(actions[1]).toEqual(
          fetchRavenNodeEventsSuccess(mockRavenNodes.result)
        );
      });
  });

  it('ravenNode Events fetch should successfull response', async () => {
    axios.get = jest.fn().mockResolvedValueOnce('');
    await fetchRavenNodes(accessToken, currentPageSize, pageStart)(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/nodes?app_name=PHARMACY&size=${currentPageSize}&start=${pageStart}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('ravenNode Events status should fail with 404 error', async () => {
    const error = {
      response: {
        status: 404,
        statusText: 'Not Found',
        data: {
          message: 'Not Found',
        },
      },
    };
    axios.get = jest.fn().mockReturnValue(Promise.reject(error));
    await fetchRavenNodes(accessToken, currentPageSize, pageStart)(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/nodes?app_name=PHARMACY&size=${currentPageSize}&start=${pageStart}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('ravenNode Events should fail with authorization error', async () => {
    const error = {
      response: {
        status: 401,
        statusText: 'Unauthorized',
        data: {
          message: 'Unauthorized',
        },
      },
    };
    axios.get = jest.fn().mockRejectedValueOnce(error);
    await fetchRavenNodes(accessToken, currentPageSize, pageStart)(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/nodes?app_name=PHARMACY&size=${currentPageSize}&start=${pageStart}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('ravenNode Events should fail with network error', async () => {
    const error = { status: 'Network Error' };
    axios.get = jest.fn().mockReturnValue(Promise.reject(error));
    await fetchRavenNodes(accessToken, currentPageSize, pageStart)(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/nodes?app_name=PHARMACY&size=${currentPageSize}&start=${pageStart}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('ravenNode events should fail with any other error', async () => {
    const error = {
      response: {
        status: 503,
        statusText: 'Not Found',
        data: {
          message: 'Not Found',
        },
      },
    };
    axios.get = jest.fn().mockReturnValue(Promise.reject(error));
    await fetchRavenNodes(accessToken, currentPageSize, pageStart)(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/nodes?app_name=PHARMACY&size=${currentPageSize}&start=${pageStart}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  //Send NodeLink Test Cases

  test('send node link should successfull', async () => {
    axios.put = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        data: mockSendNodeLink,
      })
    );
    const store = mockStore({});
    return store.dispatch(<any>sendNodeLink(accessToken, {})).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(sendRavenNodeLinkRequest());
      expect(actions[1]).toEqual(sendRavenNodeLinkSuccess());
    });
  });

  it('send node link fetch should successfull response', async () => {
    axios.put = jest.fn().mockResolvedValueOnce('');
    await sendNodeLink(accessToken, {})(dispatch);
    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node_link`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('send node link status should fail with 404 error', async () => {
    const error = {
      response: {
        status: 404,
        statusText: 'Not Found',
        data: {
          message: 'Not Found',
        },
      },
    };
    axios.put = jest.fn().mockReturnValue(Promise.reject(error));
    await sendNodeLink(accessToken, {})(dispatch);
    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node_link`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('send node link should fail with authorization error', async () => {
    const error = {
      response: {
        status: 401,
        statusText: 'Unauthorized',
        data: {
          message: 'Unauthorized',
        },
      },
    };
    axios.put = jest.fn().mockRejectedValueOnce(error);
    await sendNodeLink(accessToken, {})(dispatch);
    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node_link`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('send node link should fail with network error', async () => {
    const error = { status: 'Network Error' };
    axios.put = jest.fn().mockReturnValue(Promise.reject(error));
    await sendNodeLink(accessToken, {})(dispatch);
    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node_link`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('send node link should fail with any other error', async () => {
    const error = {
      response: {
        status: 503,
        statusText: 'Not Found',
        data: {
          message: 'Not Found',
        },
      },
    };
    axios.put = jest.fn().mockReturnValue(Promise.reject(error));
    await sendNodeLink(accessToken, {})(dispatch);
    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node_link`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  // Fetch Raven Inactive Node Link

  test('fetch raven inactive node link should successfull', async () => {
    axios.get = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        data: mockInactiveNodeLinks,
      })
    );
    const store = mockStore({});
    return store
      .dispatch(<any>fetchRavenInactiveNodeLinks(accessToken))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(fetchRavenInactiveNodeLinksRequest());
        expect(actions[1]).toEqual(
          fetchRavenInactiveNodeLinksSuccess(mockInactiveNodeLinks?.result)
        );
      });
  });

  it('fetch raven inactive node link should successfull response', async () => {
    axios.get = jest.fn().mockResolvedValueOnce('');
    await fetchRavenInactiveNodeLinks(accessToken)(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node_link/inactive`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('fetch raven inactive node link status should fail with 404 error', async () => {
    const error = {
      response: {
        status: 404,
        statusText: 'Not Found',
        data: {
          message: 'Not Found',
        },
      },
    };
    axios.get = jest.fn().mockReturnValue(Promise.reject(error));
    await fetchRavenInactiveNodeLinks(accessToken)(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node_link/inactive`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('fetch raven inactive node link should fail with authorization error', async () => {
    const error = {
      response: {
        status: 401,
        statusText: 'Unauthorized',
        data: {
          message: 'Unauthorized',
        },
      },
    };
    axios.get = jest.fn().mockRejectedValueOnce(error);
    await fetchRavenInactiveNodeLinks(accessToken)(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node_link/inactive`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('fetch raven inactive node link should fail with network error', async () => {
    const error = { status: 'Network Error' };
    axios.get = jest.fn().mockReturnValue(Promise.reject(error));
    await fetchRavenInactiveNodeLinks(accessToken)(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node_link/inactive`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('fetch raven inactive node link  should fail with any other error', async () => {
    const error = {
      response: {
        status: 503,
        statusText: 'Not Found',
        data: {
          message: 'Not Found',
        },
      },
    };
    axios.get = jest.fn().mockReturnValue(Promise.reject(error));
    await fetchRavenInactiveNodeLinks(accessToken)(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node_link/inactive`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });
});
