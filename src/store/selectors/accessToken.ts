import { RootState } from 'src/App';

/**
 * Utility function to For Access Token
 * @param {RootState} state
 */
export const getAccessToken = (state: RootState) => {
  const accessToken = state?.user?.tokens?.accessToken;
  return accessToken;
};
