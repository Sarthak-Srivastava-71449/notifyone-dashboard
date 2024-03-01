import axios from 'axios';
import { toast } from 'react-toastify';

import AppConfig from 'src/common/appConfig';

import {
  ADD_EVENT_TO_CURRENT_EVENT,
  REMOVE_EVENT_TO_CURRENT_EVENT,
  TOGGLE_ACTION_DATA_REQUEST,
  TOGGLE_ACTION_DATA_SUCCESS,
  TOGGLE_ACTION_DATA_FAILURE,
  SWITCH_CURRENT_EVENT_LOADING,
} from '../constants';

/**
 * @public
 */
export const addToCurrentEvent = (event: any) => {
  return {
    type: ADD_EVENT_TO_CURRENT_EVENT,
    payload: event,
  };
};

/**
 * @public
 */
export const switchCurrentEventLoading = (flag: boolean) => {
  return {
    type: SWITCH_CURRENT_EVENT_LOADING,
    payload: flag,
  };
};

/**
 * @public
 */
export const removeToCurrentEvent = () => {
  return {
    type: REMOVE_EVENT_TO_CURRENT_EVENT,
  };
};

/**
 * @public
 */
export const toggleEventRequest = () => {
  return {
    type: TOGGLE_ACTION_DATA_REQUEST,
  };
};

/**
 * @public
 */
export const toggleEventSuccess = (event: any) => {
  return {
    type: TOGGLE_ACTION_DATA_SUCCESS,
    payload: event.actions,
  };
};

/**
 * @public
 */
export const toggleEventFailure = (error: any) => {
  return {
    type: TOGGLE_ACTION_DATA_FAILURE,
    payload: error,
  };
};

/**
 * Method to update a toggle action for email event
 * @param  {string} accessToken User AccessToken
 * @param  {any} payload
 */
export const updateToggleActionForSingleEvent = (
  accessToken: string,
  payload: any
) => {
  return (dispatch: CurrentDispatchType) => {
    dispatch(toggleEventRequest());
    axios
      .put(`${AppConfig.serverDomain}wallet_api/event/toggle`, payload, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response: any) => {
        if (response?.data?.success === true) {
          dispatch(toggleEventSuccess(payload));
        }
      })
      .catch((error: any) => {
        toast.error(
          `Failed to Toggle Current Event ${error?.response?.data?.error}`
        );
        dispatch(toggleEventFailure(error?.response?.data?.error));
      });
  };
};
