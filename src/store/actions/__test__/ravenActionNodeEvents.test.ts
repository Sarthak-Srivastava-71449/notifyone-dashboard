import axios from 'axios';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import AppConfig from 'src/common/appConfig';
import { mockFetchRavenActionsNode } from 'src/common/renderWithProvider/constants';
import {
  fetchRavenNodeActions,
  fetchRavenNodeActionEventsRequest,
  fetchRavenNodeActionEventsSuccess,
  addNewNodeAction,
  addRavenNodeActionRequest,
  addRavenNodeActionSuccess,
  changeRavenNodeActionRequest,
  changeRavenNodeActionSuccess,
  updateNewNodeAction,
} from '../ravenActionNodeEvents';

jest.mock('axios');
const dispatch = jest.fn();
const mockStore = configureStore([thunk]);
const accessToken = 'access-token';
const currentPageSize = 0;
const pageStart = 0;
const payload = {};

// Reven ActionNode Events Test Cases //

describe('Ravan Action Node Event Test Suite', () => {
  test('fetch RavenNodeActions should successfull', async () => {
    axios.get = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        data: mockFetchRavenActionsNode,
      })
    );
    const store = mockStore({});
    return store
      .dispatch(
        <any>fetchRavenNodeActions(accessToken, currentPageSize, pageStart)
      )
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(fetchRavenNodeActionEventsRequest());
        expect(actions[1]).toEqual(
          fetchRavenNodeActionEventsSuccess(mockFetchRavenActionsNode.result)
        );
      });
  });
  it('fetch RavenNodeActions should successfull response', async () => {
    axios.get = jest.fn().mockResolvedValueOnce('');
    await fetchRavenNodeActions(
      accessToken,
      currentPageSize,
      pageStart
    )(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/nodes/actions?app_name=PHARMACY&size=${currentPageSize}&start=${pageStart}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });
  it('fetch RavenNodeActions status should fail with 404 error', async () => {
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
    await fetchRavenNodeActions(
      accessToken,
      currentPageSize,
      pageStart
    )(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/nodes/actions?app_name=PHARMACY&size=${currentPageSize}&start=${pageStart}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });
  it('fetch RavenNodeActions  should fail with authorization error', async () => {
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
    await fetchRavenNodeActions(
      accessToken,
      currentPageSize,
      pageStart
    )(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/nodes/actions?app_name=PHARMACY&size=${currentPageSize}&start=${pageStart}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });
  it('fetch RavenNodeActions  should fail with network error', async () => {
    const error = { status: 'Network Error' };
    axios.get = jest.fn().mockReturnValue(Promise.reject(error));
    await fetchRavenNodeActions(
      accessToken,
      currentPageSize,
      pageStart
    )(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/nodes/actions?app_name=PHARMACY&size=${currentPageSize}&start=${pageStart}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });
  it('fetch RavenNodeActions  should fail with any other error', async () => {
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
    await fetchRavenNodeActions(
      accessToken,
      currentPageSize,
      pageStart
    )(dispatch);
    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/nodes/actions?app_name=PHARMACY&size=${currentPageSize}&start=${pageStart}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  test('addNewNodeAction should successfull', async () => {
    axios.post = jest.fn().mockImplementationOnce(() =>
      Promise.resolve({
        data: mockFetchRavenActionsNode,
      })
    );
    const store = mockStore({});
    return store.dispatch(<any>addNewNodeAction(accessToken, {})).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual(addRavenNodeActionRequest());
      expect(actions[1]).toEqual(addRavenNodeActionSuccess());
    });
  });

  it('addNewNodeAction should successfull response', async () => {
    axios.post = jest.fn().mockResolvedValueOnce('');
    await addNewNodeAction(accessToken, {})(dispatch);
    expect(axios.post).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node/action`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('addNewNodeAction status should fail with 404 error', async () => {
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
    await addNewNodeAction(accessToken, {})(dispatch);
    expect(axios.post).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node/action`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('addNewNodeAction should fail with authorization error', async () => {
    const error = {
      response: {
        status: 401,
        statusText: 'Unauthorized',
        data: {
          message: 'Unauthorized',
        },
      },
    };
    axios.post = jest.fn().mockRejectedValueOnce(error);
    await addNewNodeAction(accessToken, {})(dispatch);
    expect(axios.post).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node/action`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('addNewNodeAction  should fail with network error', async () => {
    const error = { status: 'Network Error' };
    axios.post = jest.fn().mockReturnValue(Promise.reject(error));
    await addNewNodeAction(accessToken, {})(dispatch);
    expect(axios.post).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node/action`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('addNewNodeAction  should fail with any other error', async () => {
    const error = {
      response: {
        status: 503,
        statusText: 'Not Found',
        data: {
          message: 'Not Found',
        },
      },
    };
    axios.post = jest.fn().mockReturnValue(Promise.reject(error));
    await addNewNodeAction(accessToken, {})(dispatch);
    expect(axios.post).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node/action`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  // Update New Node Action Test Cases

  test('update new node events successfull', async () => {
    axios.put = jest.fn().mockImplementationOnce(() => Promise.resolve());
    const store = mockStore({});
    return store
      .dispatch(<any>updateNewNodeAction(accessToken, {}))
      .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual(changeRavenNodeActionRequest());
        expect(actions[1]).toEqual(changeRavenNodeActionSuccess());
      });
  });

  it('update new node event fetch should successfull response', async () => {
    axios.put = jest.fn().mockResolvedValueOnce('');
    await updateNewNodeAction(accessToken, {})(dispatch);

    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node/action`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('update new node event status should fail with 404 error', async () => {
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
    await updateNewNodeAction(accessToken, {})(dispatch);
    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node/action`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('update new node node should fail with network error', async () => {
    const error = { status: 'Network Error' };
    axios.put = jest.fn().mockReturnValue(Promise.reject(error));
    await updateNewNodeAction(accessToken, {})(dispatch);

    expect(axios.put).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node/action`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });
});
