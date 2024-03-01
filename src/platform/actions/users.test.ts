import axios from 'axios';
import AppConfig from 'src/common/appConfig';
import {
  getUserDetails,
  onSaveUserDetails,
  setBlockAction,
  setUnBlockAction,
} from './users';

const dispatch = jest.fn();

const accessToken = 'access-token';

describe('users', () => {
  it('should get user details successfull', async () => {
    const userDetails = {};

    axios.get = jest.fn().mockResolvedValue(userDetails);

    getUserDetails('access-token', 'email')(dispatch);

    const query = 'email';

    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.usermanagementURL}/info?${query}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('should fail ', async () => {
    const message = 'Network Error';
    axios.get = jest.fn().mockRejectedValueOnce(new Error(message));

    getUserDetails('access-token', 'email')(dispatch);

    const query = 'email';

    expect(axios.get).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.usermanagementURL}/info?${query}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('should successfull', async () => {
    const userDetails = {};

    axios.post = jest.fn().mockResolvedValue(userDetails);

    setBlockAction({}, 'access-token')(dispatch);

    expect(axios.post).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.usermanagementURL}/block`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  });

  it('should fail ', async () => {
    const message = 'Network Error';
    axios.post = jest.fn().mockRejectedValueOnce(new Error(message));

    setBlockAction({}, 'access-token')(dispatch);

    expect(axios.post).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.usermanagementURL}/block`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  });

  it('should successfull', async () => {
    const userDetails = {};

    axios.post = jest.fn().mockResolvedValue(userDetails);

    setUnBlockAction({}, 'access-token')(dispatch);

    expect(axios.post).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.usermanagementURL}/unblock`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  });

  it('should fail ', async () => {
    const message = 'Network Error';
    axios.post = jest.fn().mockRejectedValueOnce(new Error(message));

    setUnBlockAction({}, 'access-token')(dispatch);

    expect(axios.post).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.usermanagementURL}/unblock`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  });

  it('should successfull', async () => {
    const userDetails = {};

    axios.patch = jest.fn().mockResolvedValue(userDetails);

    onSaveUserDetails({}, 'email', 'access-token')(dispatch);

    const originalEmail = 'email';

    expect(axios.patch).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.usermanagementURL}/${originalEmail}/profile`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });

  it('should fail ', async () => {
    const message = 'Network Error';
    axios.patch = jest.fn().mockRejectedValueOnce(new Error(message));

    onSaveUserDetails({}, 'email', 'access-token')(dispatch);

    const originalEmail = 'email';

    expect(axios.patch).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.usermanagementURL}/${originalEmail}/profile`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  });
});
