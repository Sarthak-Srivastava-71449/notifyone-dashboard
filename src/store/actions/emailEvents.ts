import axios from 'axios';
import { toast } from 'react-toastify';

import { COMMUNICATION_TYPE, EVENT_FETCH_LIMIT } from 'src/common/constants';
import AppConfig from 'src/common/appConfig';

import {
  CLEAR_EMAIL_EVENT,
  FETCH_EMAIL_EVENT_REQUEST,
  FETCH_EMAIL_EVENT_SUCCESS,
  FETCH_EMAIL_EVENT_FAILURE,
  FETCH_EMAIL_EVENTS_REQUEST,
  FETCH_EMAIL_EVENTS_SUCCESS,
  FETCH_EMAIL_EVENTS_FAILURE,
  PREVIEW_EMAIL_TEMPLATE_REQUEST,
  PREVIEW_EMAIL_TEMPLATE_SUCCESS,
  PREVIEW_EMAIL_TEMPLATE_FAILURE,
  PREVIEW_EMAIL_EVENTS_REQUEST,
  PREVIEW_EMAIL_EVENTS_SUCCESS,
  PREVIEW_EMAIL_EVENTS_FAILURE,
  UPDATE_EMAIL_EVENTS_REQUEST,
  UPDATE_EMAIL_EVENTS_SUCCESS,
  UPDATE_EMAIL_EVENTS_FAILURE,
  FETCH_EMAIL_ID_TEMPLATES_FAILURE,
  FETCH_EMAIL_ID_TEMPLATES_REQUEST,
  FETCH_EMAIL_ID_TEMPLATES_SUCCESS,
} from '../constants';
import {
  addToCurrentEvent,
  removeToCurrentEvent,
  switchCurrentEventLoading,
} from './currentEvents';

/**
 * @public
 */
export const fetchCurrentIdTemplatesRequest = () => {
  return {
    type: FETCH_EMAIL_ID_TEMPLATES_REQUEST,
  };
};

/**
 * @public
 */
export const fetchEmailIdTemplatesSuccess = (data: object[]) => {
  return {
    type: FETCH_EMAIL_ID_TEMPLATES_SUCCESS,
    payload: data,
  };
};

/**
 * @public
 */
export const fetchEmailIdTemplatesFailure = (error: any) => {
  return {
    type: FETCH_EMAIL_ID_TEMPLATES_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const fetchEmailEventsRequest = () => {
  return {
    type: FETCH_EMAIL_EVENTS_REQUEST,
  };
};

/**
 * @public
 */
export const fetchEmailEventsSuccess = (data: any) => {
  return {
    type: FETCH_EMAIL_EVENTS_SUCCESS,
    payload: data,
  };
};

/**
 * @public
 */
export const fetchEmailEventsFailure = (error: any) => {
  return {
    type: FETCH_EMAIL_EVENTS_FAILURE,
    payload: error,
  };
};

/**
 * @private
 */
const clearEmailEvent = () => {
  return {
    type: CLEAR_EMAIL_EVENT,
  };
};

/**
 * @public
 */
export const fetchEmailEventRequest = () => {
  return {
    type: FETCH_EMAIL_EVENT_REQUEST,
  };
};

/**
 * @public
 */
export const fetchEmailEventSuccess = (events: any) => {
  return {
    type: FETCH_EMAIL_EVENT_SUCCESS,
    payload: events,
  };
};

/**
 * @public
 */
export const fetchEmailEventFailure = (error: any) => {
  return {
    type: FETCH_EMAIL_EVENT_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const previewEmailEventsRequest = () => {
  return {
    type: PREVIEW_EMAIL_EVENTS_REQUEST,
  };
};

/**
 * @public
 */
export const previewEmailEventsSuccess = (previews: any) => {
  return {
    type: PREVIEW_EMAIL_EVENTS_SUCCESS,
    payload: previews,
  };
};

/**
 * @public
 */
export const previewEmailEventsFailure = (error: any) => {
  return {
    type: PREVIEW_EMAIL_EVENTS_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const previewEmailTemplateRequest = () => {
  return {
    type: PREVIEW_EMAIL_TEMPLATE_REQUEST,
  };
};

/**
 * @public
 */
export const previewEmailTemplateSuccess = (preview: any) => {
  return {
    type: PREVIEW_EMAIL_TEMPLATE_SUCCESS,
    payload: preview,
  };
};

/**
 * @public
 */
export const previewEmailTemplateFailure = (error: any) => {
  return {
    type: PREVIEW_EMAIL_TEMPLATE_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const updateEmailEventsRequest = () => {
  return {
    type: UPDATE_EMAIL_EVENTS_REQUEST,
  };
};

/**
 * @public
 */
export const updateEmailEventsSuccess = (success: boolean) => {
  return {
    type: UPDATE_EMAIL_EVENTS_SUCCESS,
    payload: success,
  };
};

/**
 * @public
 */
export const updateEmailEventsFailure = (error: any) => {
  return {
    type: UPDATE_EMAIL_EVENTS_FAILURE,
    payload: error,
  };
};

/**
 * Method to fetch a single email event
 * @param  {string} accessToken User AccessToken
 * @param  {any} option Event detail
 */
export const fetchSingleEmailEvent = (accessToken: string, option: any) => {
  return (dispatch: EmailDispatchType) => {
    dispatch(fetchEmailEventRequest());

    axios
      .get(
        `${AppConfig.serverDomain}${AppConfig.emailEventsUpdate}?id=${option}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        const event = response?.data?.result?.templates;
        dispatch(fetchEmailEventSuccess(event));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to fetch Email Event ${error?.response?.data?.error}`
        );
        dispatch(fetchEmailEventFailure(error?.response?.data?.error));
      });
  };
};

/**
 * Method to clear email template
 */
export const clearEmailTemplate = () => {
  return (dispatch: EmailDispatchType) => {
    dispatch(clearEmailEvent());
  };
};

/**
 * Method to fetch all email events
 * @param  {string} accessToken
 * @param  {any} currentPageSize Current limit of events shown on a single page
 * @param  {any} templatesSize total template size
 */
export const fetchallEmailEvents = (
  accessToken: string,
  currentPageSize: any,
  templatesSize: any
) => {
  return (dispatch: EmailDispatchType) => {
    dispatch(fetchEmailEventsRequest());

    axios
      .get(
        `${AppConfig.serverDomain}notification_core/v4/events?channel=email&size=${currentPageSize}&start=${templatesSize}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        const data = response?.data?.data?.email;
        dispatch(fetchEmailEventsSuccess(data));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to fetch Email Events ${error?.response?.data?.error?.message}`
        );
        dispatch(
          fetchEmailEventsFailure(error?.response?.data?.error?.message)
        );
      });
  };
};

/**
 * Method invoked when previewing "select include" templates
 * @param  {MEmailTemplate} template Email Template
 * @param  {string} accessToken
 */
export const previewEmailTemplate = (
  template: MEmailTemplate,
  accessToken: string
) => {
  return (dispatch: EmailDispatchType) => {
    dispatch(previewEmailTemplateRequest());
    axios
      .put(
        `${AppConfig.serverDomain}${AppConfig.previewEmailEvent}`,
        {
          content: template.content,
          description: template.description,
          event_id: template.event_id,
          id: template.id,
          includes: template.includes,
          name: template.name,
          subject: template.subject,
          updated_by: template.updated_by,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        const preview = response.data.result.previews;
        dispatch(previewEmailTemplateSuccess(preview));
      })
      .catch((error: any) => {
        toast.error(`${error?.response?.data?.error}`);
        dispatch(previewEmailTemplateFailure(error?.response?.data?.error));
      });
  };
};

/**
 * Method invoked when previewing a singular email event
 * @param  {any} eventDetails Email Event Details
 * @param  {string} accessToken
 */
export const previewEmailEvent = (
  eventDetails: any,
  accessToken: { auth_token: string },
  data: any
) => {
  return (dispatch: EmailDispatchType) => {
    dispatch(previewEmailEventsRequest());
    axios
      .post(
        `${AppConfig.serverDomain}notification_core/v4/email/template/preview`,
        {
          id: eventDetails.id,
          subject: eventDetails.subject,
          content: eventDetails.event_text,
          data,
        },
        {
          headers: {
            Authorization: accessToken.auth_token,
          },
        }
      )
      .then((response: any) => {
        const previews = response.data.data?.previews;
        dispatch(previewEmailEventsSuccess(previews));
      })
      .catch((error: any) => {
        toast.error(`${error?.response?.data?.error?.message}`);
        dispatch(
          previewEmailEventsFailure(error?.response?.data?.error?.message)
        );
      });
  };
};

/**
 * Method to update email event for a singular email
 * @param  {any} eventDetails Email Event Details
 * @param  {string} accessToken
 */
export const updateEmailEvent = (
  eventDetails: any,
  accessToken: { auth_token: string },
  data: any,
  redirect: string,
  navigate: any
) => {
  return (dispatch: EmailDispatchType) => {
    dispatch(previewEmailEventsRequest());
    axios
      .post(
        `${AppConfig.serverDomain}notification_core/v4/email/template/preview`,
        {
          id: eventDetails.id,
          subject: eventDetails.subject,
          content: eventDetails.event_text,
          data,
        },
        {
          headers: {
            Authorization: accessToken.auth_token,
          },
        }
      )
      .then((response: any) => {
        const previews = response.data.data?.previews;
        dispatch(previewEmailEventsSuccess(previews));
      })
      .then(() => {
        dispatch(updateEmailEventsRequest());
        return axios.put(
          `${AppConfig.serverDomain}notification_core/v4/email/template`,
          {
            app_name: eventDetails.app_name,
            content: eventDetails.event_text,
            description: eventDetails.description,
            event_id: eventDetails.event_id,
            event_name: eventDetails.event_name,
            id: eventDetails.id,
            name: eventDetails.name,
            subject: eventDetails.subject,
            triggers_limit: eventDetails.triggers_limit,
            data,
          },
          {
            headers: {
              Authorization: accessToken.auth_token,
            },
          }
        );
      })
      .then((response: any) => {
        toast.success('Email Event Updated');
        const success = response.success;
        dispatch(updateEmailEventsSuccess(success));
        dispatch(removeToCurrentEvent());
        navigate(`/communication/templates${redirect}`);
      })
      .catch((error: any) => {
        toast.error(
          `Email Event Update Failed ${error?.response?.data?.error?.message}`
        );
        dispatch(
          updateEmailEventsFailure(error?.response?.data?.error?.message)
        );
      });
  };
};

/**
 * Method to fetch all event templates (IDs and Name Only)
 * @param  {string} accessToken
 * @param  {string} event_type: 'email' Email Event Details
 */
export const fetchEmailEventDetails = (
  accessToken: string,
  event_type: 'email'
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
        const data = response?.data?.data?.email;
        dispatch(fetchEmailIdTemplatesSuccess(data));
      })
      .catch((error: any) => {
        dispatch(switchCurrentEventLoading(false));
        toast.error(
          `Fetching All Emails Templates IDS Failed ${error?.response?.data?.error?.message}`
        );
        dispatch(
          fetchEmailIdTemplatesFailure(error?.response?.data?.error?.message)
        );
      });
  };
};

/**
 * Method to fetch current email event
 * @param  {string} accessToken
 * @param  {number} id Email Id
 */
export const fetchCurrentEmailEvent = (accessToken: string, id: number) => {
  return (dispatch: EmailDispatchType) => {
    dispatch(switchCurrentEventLoading(true));
    axios
      .get(
        `${AppConfig.serverDomain}notification_core/v4/event/${id}?channel=email`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        const data = response.data.data.email;
        dispatch(
          addToCurrentEvent({ ...data, event_type: COMMUNICATION_TYPE.Email })
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
