import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AppConfig from 'src/common/appConfig';
import {
  mockFetchRavenTicket,
  mockGetLinkNodeEvents,
  mockRavenNodes,
  mockRavenRootNodeEvents,
  mockUpdateRankEvent,
} from 'src/common/renderWithProvider/constants';
import {
  addRavenNodeEventRequest,
  addRavenNodeEventSuccess,
  createChildNodeEvent,
  createNodeEvent,
  fetchLinkedRavenNodeEventRequest,
  fetchLinkedRavenNodeEventSuccess,
  fetchRavenMetaData,
  fetchRavenRootNodeEventsRequest,
  fetchRavenRootNodeEventsSuccess,
  fetchRavenRootNodes,
  fetchRavenTicketEventsRequest,
  fetchRavenTicketEventsSuccess,
  fetchRavenTickets,
  getLinkedNodeEvents,
  updateNodeEvent,
  updateRankEvent,
  updateRavenRankEventRequest,
  updateRavenRankEventSuccess,
} from '../ravenRootNodeEvents';

jest.mock('axios');
const mockStore = configureStore([thunk]);
const dispatch = jest.fn();
const accessToken = 'access-token';
const currentPageSize = 0;
const pageStart = 0;
const payload = '';
const payload1 = {};
const actionId = '';

// Reven RootNode Events Test Cases

describe('Raven Root Node Events Test Suit', () => {
  test('raven root node events successfull', async () => {
    axios.get = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        data: mockRavenRootNodeEvents,
      })
    );
    const store = mockStore({});
    return store
      .dispatch(
        <any>fetchRavenRootNodes(accessToken, currentPageSize, pageStart)
      )
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(fetchRavenRootNodeEventsRequest());
        expect(actions[1]).toEqual(
          fetchRavenRootNodeEventsSuccess(mockRavenRootNodeEvents.result)
        );
      });
  });

  it('reven root event fetch should successfull response', async () => {
    axios.get = jest.fn().mockResolvedValueOnce('');
    await fetchRavenRootNodes(
      accessToken,
      currentPageSize,
      pageStart
    )(dispatch);

    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/nodes/root?app_name=PHARMACY&size=${currentPageSize}&start=${pageStart}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('reven root event status should fail with 404 error', async () => {
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

    await fetchRavenRootNodes(
      accessToken,
      currentPageSize,
      pageStart
    )(dispatch);

    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/nodes/root?app_name=PHARMACY&size=${currentPageSize}&start=${pageStart}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('reven root event should fail with network error', async () => {
    const error = { status: 'Network Error' };
    axios.get = jest.fn().mockReturnValue(Promise.reject(error));
    await fetchRavenRootNodes(
      accessToken,
      currentPageSize,
      pageStart
    )(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/nodes/root?app_name=PHARMACY&size=${currentPageSize}&start=${pageStart}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  // Raven Update Node Event Test Case

  it('raven update node should successfull response', async () => {
    axios.put = jest.fn().mockResolvedValueOnce('');
    await updateNodeEvent(accessToken, '')(dispatch);
    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('raven update node status should fail with 404 error', async () => {
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
    await updateNodeEvent(accessToken, '')(dispatch);
    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('raven update node should fail with network error', async () => {
    const error = { status: 'Network Error' };
    axios.put = jest.fn().mockReturnValue(Promise.reject(error));
    await updateNodeEvent(accessToken, '')(dispatch);

    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  // Create Child Node Test Case

  test('raven child node should successfull', async () => {
    axios.post = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        // data: mockWalletTransactionHistory,
      })
    );
    const store = mockStore({});
    return store
      .dispatch(<any>createChildNodeEvent(accessToken, {}))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(addRavenNodeEventRequest());
        expect(actions[1]).toEqual(addRavenNodeEventSuccess(undefined));
      });
  });

  it('raven child node should successfull response', async () => {
    axios.post = jest.fn().mockResolvedValueOnce('');
    await createChildNodeEvent(accessToken, {})(dispatch);
    expect(axios.post).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node/child`,
      payload1,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('raven child node status should fail with 404 error', async () => {
    const error = {
      response: {
        status: 404,
        statusText: 'Not Found',
        data: {
          message: 'Not Found',
        },
      },
    };
    axios.post = jest.fn().mockReturnValue(Promise.reject(error));
    await createChildNodeEvent(accessToken, {})(dispatch);
    expect(axios.post).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node/child`,
      payload1,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('raven child node should fail with network error', async () => {
    const error = { status: 'Network Error' };
    axios.post = jest.fn().mockReturnValue(Promise.reject(error));
    await createChildNodeEvent(accessToken, {})(dispatch);
    expect(axios.post).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node/child`,
      payload1,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  // Fetch Raven Ticket Test Cases

  test('fetch raven ticket should successfull', async () => {
    axios.get = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        data: mockFetchRavenTicket,
      })
    );
    const store = mockStore({});
    return store.dispatch(<any>fetchRavenTickets(accessToken)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(fetchRavenTicketEventsRequest());
      expect(actions[1]).toEqual(
        fetchRavenTicketEventsSuccess(mockFetchRavenTicket.result)
      );
    });
  });

  it('fetch raven ticket should successfull response', async () => {
    axios.get = jest.fn().mockResolvedValueOnce('');
    await fetchRavenTickets(accessToken)(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/ticket`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('fetch raven ticket status should fail with 404 error', async () => {
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
    await fetchRavenTickets(accessToken)(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/ticket`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('fetch raven ticket should fail with network error', async () => {
    const error = { status: 'Network Error' };
    axios.get = jest.fn().mockReturnValue(Promise.reject(error));
    await fetchRavenTickets(accessToken)(dispatch);

    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/ticket`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  // Fetch Raven Meta Data Test Case

  it('raven metaData fetch should successfull response', async () => {
    axios.get = jest.fn().mockResolvedValueOnce('');
    await fetchRavenMetaData(accessToken)(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/nodes/metadata`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('raven metaData status should fail with 404 error', async () => {
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
    await fetchRavenMetaData(accessToken)(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/nodes/metadata`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('raven metaData should fail with authorization error', async () => {
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
    await fetchRavenMetaData(accessToken)(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/nodes/metadata`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('raven metaData should fail with network error', async () => {
    const error = { status: 'Network Error' };
    axios.get = jest.fn().mockReturnValue(Promise.reject(error));
    await fetchRavenMetaData(accessToken)(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/nodes/metadata`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('create node event fetch should successfull response', async () => {
    axios.post = jest.fn().mockResolvedValueOnce('');
    await createNodeEvent(accessToken, {})(dispatch);
    expect(axios.post).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node`,
      payload1,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('create node event status should fail with 404 error', async () => {
    const error = {
      response: {
        status: 404,
        statusText: 'Not Found',
        data: {
          message: 'Not Found',
        },
      },
    };
    axios.post = jest.fn().mockReturnValue(Promise.reject(error));
    await createNodeEvent(accessToken, {})(dispatch);
    expect(axios.post).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node`,
      payload1,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('create node event should fail with network error', async () => {
    const error = { status: 'Network Error' };
    axios.post = jest.fn().mockReturnValue(Promise.reject(error));
    await createNodeEvent(accessToken, {})(dispatch);
    expect(axios.post).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node`,
      payload1,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  test('get linked node event should successfull', async () => {
    axios.get = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        data: mockGetLinkNodeEvents,
      })
    );
    const store = mockStore({});
    return store
      .dispatch(<any>getLinkedNodeEvents(accessToken, actionId))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(fetchLinkedRavenNodeEventRequest());
        expect(actions[1]).toEqual(
          fetchLinkedRavenNodeEventSuccess(mockGetLinkNodeEvents?.result)
        );
      });
  });

  it('get linked node event fetch should successfull response', async () => {
    axios.get = jest.fn().mockResolvedValueOnce('');

    await getLinkedNodeEvents(accessToken, actionId)(dispatch);

    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node/linked?node_action=${actionId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('get linked node event should fail with authorization error', async () => {
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
    await getLinkedNodeEvents(accessToken, actionId)(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node/linked?node_action=${actionId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  test('update rank events should successfull', async () => {
    axios.put = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        data: mockUpdateRankEvent,
      })
    );
    const store = mockStore({});
    return store.dispatch(<any>updateRankEvent(accessToken, '')).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(updateRavenRankEventRequest());
      expect(actions[1]).toEqual(
        updateRavenRankEventSuccess(mockRavenNodes?.success)
      );
    });
  });

  it('update rank Events fetch should successfull response', async () => {
    axios.put = jest.fn().mockResolvedValueOnce('');
    await updateRankEvent(accessToken, '')(dispatch);
    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node/rank`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('update rank Events status should fail with 404 error', async () => {
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
    await updateRankEvent(accessToken, '')(dispatch);
    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node/rank`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('update rank Events should fail with authorization error', async () => {
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
    await updateRankEvent(accessToken, '')(dispatch);
    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node/rank`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });
});
