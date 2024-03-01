import axios from 'axios';
import { toast } from 'react-toastify';

import AppConfig from 'src/common/appConfig';

import {
  ADD_RAVEN_NODE_ACTION_FAILURE,
  ADD_RAVEN_NODE_ACTION_REQUEST,
  ADD_RAVEN_NODE_ACTION_SUCCESS,
  CHANGE_RAVEN_NODE_ACTION_FAILURE,
  CHANGE_RAVEN_NODE_ACTION_REQUEST,
  CHANGE_RAVEN_NODE_ACTION_SUCCESS,
  FETCH_RAVEN_ACTIONS_NODES_FAILURE,
  FETCH_RAVEN_ACTIONS_NODES_REQUEST,
  FETCH_RAVEN_ACTIONS_NODES_SUCCESS,
} from '../constants';

/**
 * @public
 */
export const fetchRavenNodeActionEventsRequest = () => {
  return {
    type: FETCH_RAVEN_ACTIONS_NODES_REQUEST,
  };
};

/**
 * @public
 */
export const fetchRavenNodeActionEventsSuccess = (nodes: Array<any>) => {
  return {
    type: FETCH_RAVEN_ACTIONS_NODES_SUCCESS,
    payload: nodes,
  };
};

/**
 * @public
 */
export const fetchRavenNodeActionEventsFailure = (error: any) => {
  return {
    type: FETCH_RAVEN_ACTIONS_NODES_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const addRavenNodeActionRequest = () => {
  return {
    type: ADD_RAVEN_NODE_ACTION_REQUEST,
  };
};

/**
 * @public
 */
export const addRavenNodeActionSuccess = () => {
  return {
    type: ADD_RAVEN_NODE_ACTION_SUCCESS,
  };
};

/**
 * @public
 */
export const addRavenNodeActionFailure = (error: any) => {
  return {
    type: ADD_RAVEN_NODE_ACTION_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const changeRavenNodeActionRequest = () => {
  return {
    type: CHANGE_RAVEN_NODE_ACTION_REQUEST,
  };
};

/**
 * @public
 */
export const changeRavenNodeActionSuccess = () => {
  return {
    type: CHANGE_RAVEN_NODE_ACTION_SUCCESS,
  };
};

/**
 * @public
 */
export const changeRavenNodeActionFailure = (error: any) => {
  return {
    type: CHANGE_RAVEN_NODE_ACTION_FAILURE,
    payload: error,
  };
};

/**
 * Method to fetch raven action events from Node API
 * (Currently fetches in chunks of 200 (fetched all))
 * @param  {string} accessToken AccessToken for user
 * @param  {number} currentPageSize Current page size of existing nodes fetched
 * @param  {number} pageStart size to be started with
 */
export const fetchRavenNodeActions = (
  accessToken: string,
  currentPageSize: number,
  pageStart: number
) => {
  return (dispatch: RavenRootNodeDispatchType) => {
    dispatch(fetchRavenNodeActionEventsRequest());
    return axios
      .get(
        `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/nodes/actions?app_name=PHARMACY&size=${currentPageSize}&start=${pageStart}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        const nodes = response?.data?.result;
        dispatch(fetchRavenNodeActionEventsSuccess(nodes));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to Fetch Node Action Events ${error?.response?.data?.error}`
        );
        dispatch(
          fetchRavenNodeActionEventsFailure(error?.response?.data?.error)
        );
      });
  };
};

/**
 * Method to send create new node action event from Node API
 * @param  {string} accessToken AccessToken for user
 * @param  {object} payload JSON payload
 */
export const addNewNodeAction = (accessToken: string, payload: object) => {
  return (dispatch: RavenRootNodeDispatchType) => {
    dispatch(addRavenNodeActionRequest());
    return axios
      .post(
        `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node/action`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        toast.success('Node Action Updated!');
        dispatch(addRavenNodeActionSuccess());
      })
      .catch((error: any) => {
        toast.error(
          `Failed To Add Node Action ${error?.response?.data?.error}`
        );
        dispatch(addRavenNodeActionFailure(error?.response?.data?.error));
      });
  };
};

/**
 * Method to update node action event from Node API
 * @param  {string} accessToken AccessToken for user
 * @param  {object} payload JSON payload
 */
export const updateNewNodeAction = (accessToken: string, payload: object) => {
  return (dispatch: RavenRootNodeDispatchType) => {
    dispatch(changeRavenNodeActionRequest());
    return axios
      .put(
        `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node/action`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        toast.success('Node Action Updated!');
        dispatch(changeRavenNodeActionSuccess());
      })
      .catch((error: any) => {
        toast.error(
          `Failed To Add Node Action ${error?.response?.data?.error}`
        );
        dispatch(changeRavenNodeActionFailure(error?.response?.data?.error));
      });
  };
};
