import axios from 'axios';
import { toast } from 'react-toastify';
import AppConfig from 'src/common/appConfig';
import {
  FETCH_RAVEN_NODES_REQUEST,
  FETCH_RAVEN_NODES_SUCCESS,
  FETCH_RAVEN_NODES_FAILURE,
  SEND_RAVEN_NODE_LINK_FAILURE,
  SEND_RAVEN_NODE_LINK_REQUEST,
  SEND_RAVEN_NODE_LINK_SUCCESS,
  FETCH_RAVEN_INACTIVE_NODE_LINKS_FAILURE,
  FETCH_RAVEN_INACTIVE_NODE_LINKS_REQUEST,
  FETCH_RAVEN_INACTIVE_NODE_LINKS_SUCCESS,
} from '../constants';
import { fetchPushNotificationEventsFailure } from './pushNotificationEvents';
import { fetchRavenNodeActionEventsRequest } from './ravenActionNodeEvents';

/**
 * @public
 */
export const fetchRavenInactiveNodeLinksRequest = () => {
  return {
    type: FETCH_RAVEN_INACTIVE_NODE_LINKS_REQUEST,
  };
};

/**
 * @public
 */
export const fetchRavenInactiveNodeLinksSuccess = (nodes: Array<any>) => {
  return {
    type: FETCH_RAVEN_INACTIVE_NODE_LINKS_SUCCESS,
    payload: nodes,
  };
};

/**
 * @public
 */
export const fetchRavenInactiveNodeLinksFailure = (error: any) => {
  return {
    type: FETCH_RAVEN_INACTIVE_NODE_LINKS_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const sendRavenNodeLinkRequest = () => {
  return {
    type: SEND_RAVEN_NODE_LINK_REQUEST,
  };
};

/**
 * @public
 */
export const sendRavenNodeLinkSuccess = () => {
  return {
    type: SEND_RAVEN_NODE_LINK_SUCCESS,
  };
};

/**
 * @public
 */
export const sendRavenNodeLinkFailure = (error: any) => {
  return {
    type: SEND_RAVEN_NODE_LINK_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const fetchRavenNodeEventsRequest = () => {
  return {
    type: FETCH_RAVEN_NODES_REQUEST,
  };
};

/**
 * @public
 */
export const fetchRavenNodeEventsSuccess = (nodes: Array<any>) => {
  return {
    type: FETCH_RAVEN_NODES_SUCCESS,
    payload: nodes,
  };
};

/**
 * @public
 */
export const fetchRavenNodeEventsFailure = (error: any) => {
  return {
    type: FETCH_RAVEN_NODES_FAILURE,
    payload: error,
  };
};

/**
 * Method to fetch raven node events from Node API
 * (Currently fetches in chunks of 200 (fetched all))
 * @param  {string} accessToken AccessToken for user
 * @param  {number} currentPageSize Current page size of existing nodes fetched
 * @param  {number} pageStart size to be started with
 */
export const fetchRavenNodes = (
  accessToken: string,
  currentPageSize: number,
  pageStart: number
) => {
  return (dispatch: RavenRootNodeDispatchType) => {
    dispatch(fetchRavenNodeActionEventsRequest());
    return axios
      .get(
        `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/nodes?app_name=PHARMACY&size=${currentPageSize}&start=${pageStart}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        const nodes = response?.data?.result;
        dispatch(fetchRavenNodeEventsSuccess(nodes));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to Fetch Node Events ${error?.response?.data?.error}`
        );
        dispatch(fetchRavenNodeEventsFailure(error?.response?.data?.error));
      });
  };
};

/**
 * Method to send root node link event from Node API
 * @param  {string} accessToken AccessToken for user
 * @param  {object} payload JSON payload
 */
export const sendNodeLink = (accessToken: string, payload: object) => {
  return (dispatch: RavenRootNodeDispatchType) => {
    dispatch(sendRavenNodeLinkRequest());
    return axios
      .put(
        `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node_link`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then(() => {
        toast.success('Toggled Node Link Successfully!');
        dispatch(sendRavenNodeLinkSuccess());
      })
      .catch((error: any) => {
        toast.error(`${error?.response?.data?.error}`);
        dispatch(sendRavenNodeLinkFailure(error?.response?.data?.error));
      });
  };
};

/**
 * Method to fetch inactive raven root node events from Node API
 * @param  {string} accessToken AccessToken for user
 */
export const fetchRavenInactiveNodeLinks = (accessToken: string) => {
  return (dispatch: RavenRootNodeDispatchType) => {
    dispatch(fetchRavenInactiveNodeLinksRequest());
    return axios
      .get(
        `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node_link/inactive`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        const inactiveNodeLinks = response?.data?.result;
        dispatch(fetchRavenInactiveNodeLinksSuccess(inactiveNodeLinks));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to Fetch Root Inactive Node Links ${error?.response?.data?.error}`
        );
        dispatch(
          fetchPushNotificationEventsFailure(error?.response?.data?.error)
        );
      });
  };
};
