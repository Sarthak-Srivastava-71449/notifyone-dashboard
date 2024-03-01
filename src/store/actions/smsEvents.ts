import axios from 'axios';
import { toast } from 'react-toastify';

import AppConfig from 'src/common/appConfig';

import {
  FETCH_SMS_EVENTS_REQUEST,
  FETCH_SMS_EVENTS_SUCCESS,
  FETCH_SMS_EVENTS_FAILURE,
  UPDATE_SMS_EVENTS_REQUEST,
  UPDATE_SMS_EVENTS_SUCCESS,
  UPDATE_SMS_EVENTS_FAILURE,
  FETCH_SMS_TEMPLATES_SUCCESS,
  FETCH_SMS_TEMPLATES_FAILURE,
  PREVIEW_SMS_EVENTS_REQUEST,
  PREVIEW_SMS_EVENTS_SUCCESS,
  PREVIEW_SMS_EVENTS_FAILURE,
} from '../constants';

import {
  addToCurrentEvent,
  removeToCurrentEvent,
  switchCurrentEventLoading,
} from './currentEvents';
import { COMMUNICATION_TYPE } from 'src/common/constants';
import { useNavigate } from 'react-router-dom';

/**
 * @public
 */
export const fetchSMSEventsRequest = () => {
  return {
    type: FETCH_SMS_EVENTS_REQUEST,
  };
};

/**
 * @public
 */
export const fetchSMSEventsSuccess = (events: any) => {
  return {
    type: FETCH_SMS_EVENTS_SUCCESS,
    payload: events,
  };
};

/**
 * @public
 */
export const fetchSMSEventsFailure = (error: any) => {
  return {
    type: FETCH_SMS_EVENTS_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const fetchSmsTemplatesSuccess = (data: object[]) => {
  return {
    type: FETCH_SMS_TEMPLATES_SUCCESS,
    payload: data,
  };
};
/**
 * @public
 */
export const fetchSmsTemplatesFailure = (error: any) => {
  return {
    type: FETCH_SMS_TEMPLATES_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const previewSmsEventsRequest = () => {
  return {
    type: PREVIEW_SMS_EVENTS_REQUEST,
  };
};

/**
 * @public
 */
export const previewSmsEventsSuccess = (previews: any) => {
  return {
    type: PREVIEW_SMS_EVENTS_SUCCESS,
    payload: previews,
  };
};

/**
 * @public
 */
export const previewSmsEventsFailure = (error: any) => {
  return {
    type: PREVIEW_SMS_EVENTS_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const updateSMSEventRequest = () => {
  return {
    type: UPDATE_SMS_EVENTS_REQUEST,
  };
};

/**
 * @public
 */
export const updateSMSEventSuccess = (success: boolean) => {
  return {
    type: UPDATE_SMS_EVENTS_SUCCESS,
    payload: success,
  };
};

/**
 * @public
 */
export const updateSMSEventFailure = (error: any) => {
  return {
    type: UPDATE_SMS_EVENTS_FAILURE,
    payload: error,
  };
};

/**
 * Method to fetch all event templates (IDs and Name Only)
 * @param  {string} accessToken
 * @param  {string} event_type: 'sms' Email Event Details
 */
export const fetchSmsEventDetails = (
  accessToken: string,
  event_type: 'sms'
) => {
  return (dispatch: EmailDispatchType) => {
    axios
      .get(
        `${AppConfig.serverDomain}notification_core/v4/events?channel=${event_type}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        const data = response?.data?.data?.sms;
        dispatch(fetchSmsTemplatesSuccess(data));
      })
      .catch((error: any) => {
        dispatch(switchCurrentEventLoading(false));
        toast.error(
          `Fetching All SMS Templates Failed ${error?.response?.data?.error?.message}`
        );
        dispatch(
          fetchSmsTemplatesFailure(error?.response?.data?.error?.message)
        );
      });
  };
};

/**
 * Method to fetch SMS Events from Node API
 * (Currently fetches in chunks of 50)
 * @param  {string} accessToken AccessToken for user
 * @param  {number} currentPageSize Current page size of existing events fetched
 * @param  {number} templatesSize template size to be fetched
 */
export const fetchSmsEvents = (
  accessToken: string,
  currentPageSize: number,
  templatesSize: number
) => {
  return (dispatch: SMSEventDispatchType) => {
    dispatch(fetchSMSEventsRequest());

    axios
      .get(
        `${AppConfig.serverDomain}notification_core/v4/events?channel=sms&size=${currentPageSize}&start=${templatesSize}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        const data = response?.data?.data?.sms;
        dispatch(fetchSMSEventsSuccess(data));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to fetch Sms Events ${error?.response?.data?.error?.message}`
        );
        dispatch(fetchSMSEventsFailure(error?.response?.data?.error?.message));
      });
  };
};

/**
 * Method to update SMS event
 * @param  {SMSEventDispatchType} eventDetails Simple SMS details that needs to update
 * @param  {string} accessToken AccessToken for user
 */
export const updateSmsEvent = (
  eventDetails: MSMSTemplate,
  accessToken: { auth_token: string },
  data: any,
  redirect: string,
  navigate: any
) => {
  return (dispatch: SMSEventDispatchType) => {
    dispatch(updateSMSEventRequest());
    axios
      .put(
        `${AppConfig.serverDomain}notification_core/v4/sms/template`,
        {
          id: eventDetails.id,
          app_name: eventDetails.app_name,
          event_name: eventDetails.event_name,
          trigger_limit: eventDetails.triggers_limit,
          content: eventDetails.event_text,
          event_id: eventDetails.event_id,
          data,
        },
        {
          headers: {
            Authorization: accessToken.auth_token,
          },
        }
      )
      .then((response: any) => {
        toast.success('Sms Event Updated');
        const success = response.success;
        dispatch(updateSMSEventSuccess(success));
        dispatch(removeToCurrentEvent());
        navigate(`/communication/templates${redirect}`);
      })
      .catch((error: any) => {
        toast.error(
          `Sms Event Update Failed ${error.response?.data?.error?.message}`
        );
        dispatch(updateSMSEventFailure(error.response?.data?.error?.message));
      });
  };
};

/**
 * Method to fetch current email event
 * @param  {string} accessToken
 * @param  {number} id Email Id
 */
export const fetchCurrentSmsEvent = (accessToken: string, id: number) => {
  return (dispatch: SMSEventDispatchType) => {
    dispatch(switchCurrentEventLoading(true));
    axios
      .get(
        `${AppConfig.serverDomain}notification_core/v4/event/${id}?channel=sms`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        const data = response.data.data.sms;
        dispatch(
          addToCurrentEvent({ ...data, event_type: COMMUNICATION_TYPE.SMS })
        );
        dispatch(switchCurrentEventLoading(false));
      })
      .catch((error: any) => {
        dispatch(addToCurrentEvent(null));
        dispatch(switchCurrentEventLoading(false));
        toast.error(
          `Failed to fetch template for this ID ${error?.response?.data?.error?.message}`
        );
      });
  };
};

/**
 * Method invoked when previewing a singular email event
 * @param  {any} eventDetails Email Event Details
 * @param  {string} accessToken
 */
export const previewSmsEvent = (
  eventDetails: any,
  accessToken: { auth_token: string },
  data: any
) => {
  return (dispatch: EmailDispatchType) => {
    dispatch(previewSmsEventsRequest());
    axios
      .post(
        `${AppConfig.serverDomain}notification_core/v4/sms/template/preview`,
        {
          content: eventDetails.event_text,
          event_name: eventDetails.event_name,
          data,
        },
        {
          headers: {
            Authorization: accessToken.auth_token,
          },
        }
      )
      .then((response: any) => {
        const previews = response.data?.data;
        dispatch(previewSmsEventsSuccess(previews));
      })
      .catch((error: any) => {
        toast.error(
          `${error?.response?.data?.error?.message || 'Error in preview'}`
        );
        dispatch(
          previewSmsEventsFailure(
            error?.response?.data?.error?.message || 'Error'
          )
        );
      });
  };
};
