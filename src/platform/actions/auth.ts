import axios from 'axios';
import { toast } from 'react-toastify';
import { deletePharmaCookie, deleteLabsCookie } from 'src/common1/utils';
import { NETWORK_ERROR } from '../constants/error';
import AppConfig from '../appConfig';

import {
  AUTHENTICATE_USER_FAILURE,
  AUTHENTICATE_USER_REQUEST,
  AUTHENTICATE_USER_SUCCESS,
  USER_ROLES_REQUEST,
  USER_ROLES_SUCCESS,
  USER_ROLES_FAILURE,
  LOGOUT_USER,
} from '../constants';
import jwtDecode from 'jwt-decode';
interface AxiosGoogleResponse {
  auth_token: string;
  auth_token_labs: string;
  token: string;
  username: string;
}

interface AxiosGoogleResponse {
  auth_token: string;
  auth_token_labs: string;
  token: string;
  username: string;
}

/**
 * @public
 */
export const authenticateUserRequest = () => {
  return {
    type: AUTHENTICATE_USER_REQUEST,
  };
};

/**
 * @public
 */
export const authenticateUserSuccess = (response: any) => {
  return {
    type: AUTHENTICATE_USER_SUCCESS,
    payload: response,
  };
};

/**
 * @public
 */
export const authenticateUserFailure = (error: any) => {
  return {
    type: AUTHENTICATE_USER_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const userRolesRequest = () => {
  return {
    type: USER_ROLES_REQUEST,
  };
};

/**
 * @private
 */
const userRolesSuccess = (response: any) => {
  return {
    type: USER_ROLES_SUCCESS,
    payload: response,
  };
};

/**
 * Failure action if user role fetching fails
 * @returns error
 */
export const userRolesFailure = (error: any) => {
  return {
    type: USER_ROLES_FAILURE,
    payload: error,
  };
};

/**
 * Action to complete user/pass authentication flow
 * LABS SPECIFIC ENDPOINT
 * @param  {obj} Data Object
 */
export const authenticateUserWithUserPass = (data: any) => {
  return (dispatch: UserActionDispatchType) => {
    dispatch(authenticateUserRequest());
    // Accessing Google Auth Object from Window
    if (data) {
      axios
        .post(
          `${AppConfig.serverDomain}${AppConfig.userPassloginRoute}`,
          data,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        )
        .then((response) => {
          const user = { name: response.data.username };
          const success = response.status;
          const token = response.data.token;
          const decodedToken: any = jwtDecode(token);
          const payload = {
            ...user,
            tokens: { accessToken: token },
            success,
            loading: false,
            roles: decodedToken.roles,
          };
          dispatch(authenticateUserSuccess(payload));
          return response;
        })
        .catch((error) => {
          console.log(error.response.data.error);
          toast.error(`${error.response.data.error}`);
          dispatch(authenticateUserFailure(error.response.data.error));
        })
        .catch((error) => {
          console.log(error);
          if (!error.status) {
            toast.error(`${NETWORK_ERROR}`);
          }
        });
    }
  };
};

/**
 * Action to complete authentication flow with
 * @param  {string} code
 */
export const authenticateUserWithGoogle = (code: string) => {
  return (dispatch: UserActionDispatchType) => {
    dispatch(authenticateUserRequest());
    // Accessing Google Auth Object from Window
    if (code) {
      axios
        .post<AxiosGoogleResponse>(
          `${AppConfig.serverDomain}${AppConfig.loginRoute}`,
          {
            code: code,
          }
        )
        .then((response) => {
          const user = { name: response.data.username };
          const success = response.status;
          const payload = {
            ...user,
            tokens: {
              accessToken: response.data.token,
            },
            success,
            loading: false,
            roles: {},
          };
          dispatch(authenticateUserSuccess(payload));
          localStorage.setItem('accessToken', response.data.token);
          localStorage.setItem('success', success.toString());
          if (response?.data?.auth_token) {
            document.cookie = `auth_token_admin=${response.data.auth_token}; domain=.1mg.com;`;
          }
          return response;
        })
        .then((response) => {
          dispatch(userRolesRequest());
          const roleURl = `${AppConfig.serverDomain}${AppConfig.userInfoRoute}`;
          axios
            .get<UserInfoResponse>(roleURl, {
              headers: {
                Authorization: `Bearer ${response.data.token}`,
              },
            })
            .then((response) => {
              const payload = response.data;
              dispatch(userRolesSuccess(payload));
            })
            .catch((error: any) => {
              dispatch(userRolesFailure(error));
              clearData();
            });
        })
        .catch(() => {
          toast.error(`${NETWORK_ERROR}`);
          dispatch(authenticateUserFailure(NETWORK_ERROR));
        })
        .catch((error) => {
          if (!error.status) {
            toast.error(`${NETWORK_ERROR}`);
          }
        });
    }
  };
};

export const fetchUserInfo = (accessToken: string) => {
  return (dispatch: UserActionDispatchType) => {
    dispatch(userRolesRequest());
    const roleURl = `${AppConfig.serverDomain}${AppConfig.userInfoRoute}`;
    axios
      .get<UserInfoResponse>(roleURl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response) => {
        const payload = response.data;
        dispatch(userRolesSuccess(payload));
      })
      .catch((error: any) => {
        toast.error(`${error.response?.data?.error?.message}`);
        dispatch(userRolesFailure(error));
        clearData();
      });
  };
};

const clearData = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('success');
  deletePharmaCookie('auth_token_admin');
  deleteLabsCookie('username_labsAdmin');
  deleteLabsCookie('jwt_token_labs');
  location.href = '/login';
};

/**
 * Logout Action for Auth
 * @param  {string} _accessToken
 */
export const logoutUser = () => {
  clearData();
  return {
    type: LOGOUT_USER,
  };
};
