import axios from 'axios';
import { toast } from 'react-toastify';

import AppConfig from 'src/common/appConfig';
import { AUTHORIZATION_ERROR, NETWORK_ERROR } from 'src/common/constants/error';

import {
  CHANGE_USER_CREDENTIALS,
  ON_VALIDATE_INPUT,
  SHOW_SUCCESS_MESSAGE,
  SUCCESS_BLOCK_UNBLOCK,
  SUCCESS_CLEAR_FIELDS,
  SUCCESS_GET_ERROR,
  GET_USER_INFO_REQUEST,
  SUCCESS_GET_USER_INFO,
  SUCCESS_HIDE_ERRORS,
} from '../constants';

/**
 * Method called on change in values in search textbox
 * @param  {string} value
 * @returns value
 */
export const onHandleChange = (value: string) => {
  return {
    type: ON_VALIDATE_INPUT,
    payload: value,
  };
};

/**
 * @public
 */
export const onGetUserInfo = (result: object) => ({
  type: SUCCESS_GET_USER_INFO,
  payload: result,
});

/**
 * @public
 */
export const onGetError = (error: any) => ({
  type: SUCCESS_GET_ERROR,
  payload: error,
});

/**
 * @public
 */
export const onClearFields = () => ({
  type: SUCCESS_CLEAR_FIELDS,
});

/**
 * @public
 */
export const onShowSuccessMessage = (value: any) => ({
  type: SHOW_SUCCESS_MESSAGE,
  payload: value,
});

/**
 * @public
 */
export const changeUserDetails = (data: any) => ({
  type: CHANGE_USER_CREDENTIALS,
  payload: data,
});

/**
 * @public
 */
export const onRemoveErrors = () => ({
  type: SUCCESS_HIDE_ERRORS,
});

/**
 * @public
 */
export const onBlockUnBlock = (
  option: boolean,
  status: string,
  message: string
) => ({
  type: SUCCESS_BLOCK_UNBLOCK,
  payload: {
    option,
    status,
    message,
  },
});

/**
 * Method to hideErrors after dispatching them
 * @param  {any} Error
 */
const onHideErrors = (option: any) => {
  return (dispatch: any) => {
    if (option) {
      setTimeout(() => {
        dispatch(onRemoveErrors());
      }, 2000);
    }
  };
};

/**
 * @public
 */
export const onGetUserInfoRequest = () => ({
  type: GET_USER_INFO_REQUEST,
});

/**
 * Method to fetch user details by email
 * @param  {string} accessToken accessToken
 * @param  {string} query user's email or phone
 */
export const getUserDetails = (accessToken: string, query: string) => {
  return (dispatch: any) => {
    dispatch(onGetUserInfoRequest());
    axios
      .get<any>(
        `${AppConfig.serverDomain}${AppConfig.usermanagementURL}/info?${query}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response) => {
        if (response.data.result.result) {
          dispatch(onGetUserInfo(response.data.result.result));
        } else {
          dispatch(onGetError(response.data.result.error_message));
          toast.error(response.data.result.error_message);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error(AUTHORIZATION_ERROR);
        } else if (error.response.status === 404) {
          toast.error(`${error.response.status}. ${error.response.data.error}`);
          dispatch(onGetError(error.response.data.error));
        }
      })
      .catch((error) => {
        if (!error.status) {
          toast.error(`${NETWORK_ERROR}`);
        }
      });
  };
};
/**
 * Method to block user's api
 * @param  {obj} dataToSend email or phone object
 * @param  {string} accessToken AccessToken
 */
export const setBlockAction = (dataToSend: any, accessToken: string) => {
  return (dispatch: any) => {
    axios
      .post(
        `${AppConfig.serverDomain}${AppConfig.usermanagementURL}/block`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response: any) => {
        if (response.error) {
          dispatch(onGetError(response.data.result.error_message));
        } else {
          dispatch(
            onBlockUnBlock(true, 'Activate', response.data.result.message)
          );
          toast.success(response.data.result.message);
        }
        dispatch(onHideErrors(true));
      })
      .catch((error: any) => {
        if (error.response.status === 401) {
          toast.error(AUTHORIZATION_ERROR);
        } else if (error.response.status === 404) {
          toast.error(`${error.response.status}. ${error.response.data.error}`);
          dispatch(onGetError(error.response.data.error));
        }
        dispatch(onHideErrors(true));
      })
      .catch((error) => {
        if (!error.status) {
          toast.error(`${NETWORK_ERROR}`);
        }
      });
  };
};

/**
 * Method to unblock user api's
 * @param  {obj} dataToSend email or phone data object
 * @param  {string} accessToken access token
 */
export const setUnBlockAction = (dataToSend: any, accessToken: any) => {
  return (dispatch: any) => {
    axios
      .post(
        `${AppConfig.serverDomain}${AppConfig.usermanagementURL}/unblock`,
        dataToSend,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response: any) => {
        if (response.error) {
          dispatch(onGetError(response.data.result.error_message));
        } else {
          dispatch(
            onBlockUnBlock(false, 'Deactivate', response.data.result.message)
          );
          toast.success(response.data.result.message);
        }
        dispatch(onHideErrors(true));
      })
      .catch((error: any) => {
        if (error.response.status === 401) {
          toast.error(AUTHORIZATION_ERROR);
        } else if (error.response.status === 404) {
          toast.error(`${error.response.status}. ${error.response.data.error}`);
          dispatch(onGetError(error.response.data.error));
        }
        dispatch(onHideErrors(true));
      })
      .catch((error) => {
        if (!error.status) {
          toast.error(`${NETWORK_ERROR}`);
        }
      });
  };
};

/**
 * Method called on button click for activation or deactivating users
 * @param  {boolean} value if true user will be blocked else unblocked
 * @param  {object} data email or phone number object
 * @param  {string} accessToken accessToken
 */
export const setUserActivation = (
  value: boolean,
  data: any,
  accessToken: string
) => {
  return (dispatch: any) => {
    const bodyFormData = new FormData();
    for (const key in data) {
      bodyFormData.append(key, data[key]);
    }
    if (value) {
      dispatch(setBlockAction(bodyFormData, accessToken));
    } else {
      dispatch(setUnBlockAction(bodyFormData, accessToken));
    }
  };
};
/**
 * Method gets called when user clicks on save, used to update email and name
 * @param  {any} data userInfo Object
 * @param  {string} originalEmail user orignial email from state
 * @param  {string} accessToken accessToken
 * @returns string
 */
export const onSaveUserDetails = (
  data: any,
  originalEmail: string,
  accessToken: string
) => {
  return (dispatch: any) => {
    axios
      .patch(
        `${AppConfig.serverDomain}${AppConfig.usermanagementURL}/${originalEmail}/profile`,
        data,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        if (!response.data.result.error_code) {
          toast.success(response.data.result.message);
          dispatch(onShowSuccessMessage(response.data.result.message));
        } else {
          dispatch(onGetError(response.data.result.error_message));
          toast.error(response.data.result.error_message);
        }
        dispatch(onHideErrors(true));
      })
      .catch((error: any) => {
        if (error.response.status === 401) {
          toast.error(AUTHORIZATION_ERROR);
        } else if (error.response.status === 404) {
          toast.error(`${error.response.status}. ${error.response.data.error}`);
          dispatch(onGetError(error.response.data.error));
        } else if (error.response.status === 500) {
          toast.error(`${error.response.status}. ${error.response.data.error}`);
          dispatch(onGetError(error.response.data.error));
        }
        dispatch(onHideErrors(true));
      })
      .catch((error) => {
        if (!error.status) {
          toast.error(`${NETWORK_ERROR}`);
        }
      });
  };
};
