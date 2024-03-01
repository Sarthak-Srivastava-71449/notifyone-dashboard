import axios from 'axios';
import { toast } from 'react-toastify';

import AppConfig from 'src/common/appConfig';

import {
  FETCH_WHATS_APP_EVENTS_REQUEST,
  FETCH_WHATS_APP_EVENTS_SUCCESS,
  FETCH_WHATS_APP_EVENTS_FAILURE,
  UPDATE_WHATS_APP_EVENTS_REQUEST,
  UPDATE_WHATS_APP_EVENTS_SUCCESS,
  UPDATE_WHATS_APP_EVENTS_FAILURE,
  FETCH_WHATSAPP_TEMPLATES_SUCCESS,
  FETCH_WHATSAPP_TEMPLATES_FAILURE,
} from '../constants';

import {
  addToCurrentEvent,
  removeToCurrentEvent,
  switchCurrentEventLoading,
} from './currentEvents';
import { COMMUNICATION_TYPE } from 'src/common/constants';

/**
 * @public
 */
export const fetchWhatsAppEventsRequest = () => {
  return {
    type: FETCH_WHATS_APP_EVENTS_REQUEST,
  };
};

/**
 * @public
 */
export const fetchWhatsappTemplatesSuccess = (data: object[]) => {
  return {
    type: FETCH_WHATSAPP_TEMPLATES_SUCCESS,
    payload: data,
  };
};
/**
 * @public
 */
export const fetchWhatsappTemplatesFailure = (error: any) => {
  return {
    type: FETCH_WHATSAPP_TEMPLATES_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const fetchWhatsAppEventsSuccess = (events: any) => {
  return {
    type: FETCH_WHATS_APP_EVENTS_SUCCESS,
    payload: events,
  };
};

/**
 * @public
 */
export const fetchWhatsAppEventsFailure = (error: any) => {
  return {
    type: FETCH_WHATS_APP_EVENTS_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const updateWhatsAppEventsRequest = () => {
  return {
    type: UPDATE_WHATS_APP_EVENTS_REQUEST,
  };
};

/**
 * @public
 */
export const updateWhatsAppEventsSuccess = (success: boolean) => {
  return {
    type: UPDATE_WHATS_APP_EVENTS_SUCCESS,
    payload: success,
  };
};

/**
 * @public
 */
export const updateWhatsAppEventsFailure = (error: any) => {
  return {
    type: UPDATE_WHATS_APP_EVENTS_FAILURE,
    payload: error,
  };
};

/**
 * Method to fetch all event templates (IDs and Name Only)
 * @param  {string} accessToken
 * @param  {string} event_type: 'whatsapp' Email Event Details
 */
export const fetchWhatsappEventDetails = (
  accessToken: string,
  event_type: 'whatsapp'
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
        const data = response?.data?.data?.whatsapp;
        dispatch(fetchWhatsappTemplatesSuccess(data));
      })
      .catch((error: any) => {
        dispatch(switchCurrentEventLoading(false));
        toast.error(
          `Fetching All Whatsapp Templates Failed ${error?.response?.data?.error?.message}`
        );
        dispatch(
          fetchWhatsappTemplatesFailure(error?.response?.data?.error?.message)
        );
      });
  };
};

/**
 * Method to fetch whatsapp events in chunks of 50
 * @param  {string} accessToken AccessToken for user
 * @param  {number} currentPageSize Current data fetched in page
 * @param  {number} templatesSize data fetching chunk size
 */
export const fetchWhatsAppEvents = (
  accessToken: string,
  currentPageSize: number,
  templatesSize: number
) => {
  return (dispatch: WhatsappDispatchType) => {
    dispatch(fetchWhatsAppEventsRequest());
    axios
      .get(
        `${AppConfig.serverDomain}notification_core/v4/events?channel=whatsapp&size=${currentPageSize}&start=${templatesSize}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        const data = response?.data?.data?.whatsapp;
        dispatch(fetchWhatsAppEventsSuccess(data));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to fetch WhatsApp Events ${error?.response?.data?.error?.message}`
        );
        dispatch(
          fetchWhatsAppEventsFailure(error?.response?.data?.error?.message)
        );
      });
  };
};

/**
 * Method to update Whatsapp singular event
 * @param  {MWhatsappTemplate} eventDetails Single Template event details
 * @param  {string} accessToken AccessToken for user
 */
export const updateWhatsAppEvent = (
  eventDetails: MWhatsappTemplate,
  accessToken: { auth_token: string },
  data: any,
  redirect: string,
  navigate: any
) => {
  return (dispatch: WhatsappDispatchType) => {
    dispatch(updateWhatsAppEventsRequest());
    axios
      .put(
        `${AppConfig.serverDomain}notification_core/v4/whatsapp/template`,
        {
          id: eventDetails.id,
          app_name: eventDetails.app_name,
          event_name: eventDetails.event_name,
          event_id: eventDetails.event_id,
          name: eventDetails.event_text,
          trigger_limit: eventDetails.triggers_limit,
          data,
        },
        {
          headers: {
            Authorization: accessToken.auth_token,
          },
        }
      )
      .then((response: any) => {
        toast.success('WhatsApp Event Updated');
        const success = response.success;
        dispatch(updateWhatsAppEventsSuccess(success));
        dispatch(removeToCurrentEvent());
        navigate(`/communication/templates${redirect}`);
      })
      .catch((error: any) => {
        toast.error(
          `Failed to update WhatsApp Event ${error.response?.data?.error?.message}`
        );
        dispatch(
          updateWhatsAppEventsFailure(error.response?.data?.error?.message)
        );
      });
  };
};

/**
 * Method to fetch current email event
 * @param  {string} accessToken
 * @param  {number} id Email Id
 */
export const fetchCurrentWhatsappEvent = (accessToken: string, id: number) => {
  return (dispatch: SMSEventDispatchType) => {
    dispatch(switchCurrentEventLoading(true));
    axios
      .get(
        `${AppConfig.serverDomain}notification_core/v4/event/${id}?channel=whatsapp`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        const data = response.data.data.whatsapp;
        dispatch(
          addToCurrentEvent({
            ...data,
            event_type: COMMUNICATION_TYPE.Whatsapp,
          })
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
