import axios from 'axios';
import AppConfig from 'src/common/appConfig';

import { authenticateUserWithGoogle } from './auth';

const dispatch = jest.fn();

describe('authenticateUserWithGoogle', () => {
  it('should successfull', async () => {
    const userDetails = {};

    axios.post = jest.fn().mockResolvedValue(userDetails);

    authenticateUserWithGoogle('code')(dispatch);

    expect(axios.post).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.loginRoute}`,
      { code: 'code' }
    );
  });

  it('should return empty ', async () => {
    const message = 'Network Error';
    axios.post = jest.fn().mockRejectedValueOnce(new Error(message));

    authenticateUserWithGoogle('code')(dispatch);

    expect(axios.post).toHaveBeenCalledWith(
      `${AppConfig.serverDomain}${AppConfig.loginRoute}`,
      { code: 'code' }
    );
  });
});
