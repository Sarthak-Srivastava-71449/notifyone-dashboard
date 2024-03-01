import axios from 'axios';
import { toast } from 'react-toastify';

import AppConfig from 'src/common/appConfig';

import {
  CREATE_RAVEN_NODE_REQUEST,
  CREATE_RAVEN_NODE_SUCCESS,
  CREATE_RAVEN_NODE_FAILURE,
  FETCH_RAVEN_ROOT_NODES_REQUEST,
  FETCH_RAVEN_ROOT_NODES_SUCCESS,
  FETCH_RAVEN_ROOT_NODES_FAILURE,
  UPDATE_RAVEN_NODE_REQUEST,
  UPDATE_RAVEN_NODE_FAILURE,
  UPDATE_RAVEN_NODE_SUCCESS,
  ADD_RAVEN_NODE_FAILURE,
  ADD_RAVEN_NODE_REQUEST,
  ADD_RAVEN_NODE_SUCCESS,
  FETCH_RAVEN_METADATA_FAILURE,
  FETCH_RAVEN_METADATA_REQUEST,
  FETCH_RAVEN_METADATA_SUCCESS,
  FETCH_RAVEN_TICKET_FAILURE,
  FETCH_RAVEN_TICKET_REQUEST,
  FETCH_RAVEN_TICKET_SUCCESS,
  ASSIGN_ROOT_NODE_DETAILS,
  FETCH_LINKED_RAVEN_NODE_FAILURE,
  FETCH_LINKED_RAVEN_NODE_REQUEST,
  FETCH_LINKED_RAVEN_NODE_SUCCESS,
  UPDATE_RAVEN_NODE_RANK_FAILURE,
  UPDATE_RAVEN_NODE_RANK_REQUEST,
  UPDATE_RAVEN_NODE_RANK_SUCCESS,
  UPDATE_CHANGE_NODE_RANK,
  SET_CURRENT_NODE_KEY,
} from '../constants';

/**
 * @public
 */
export const createRavenNodeEventRequest = () => {
  return {
    type: CREATE_RAVEN_NODE_REQUEST,
  };
};

/**
 * @public
 */
export const createRavenNodeEventSuccess = (success: boolean) => {
  return {
    type: CREATE_RAVEN_NODE_SUCCESS,
    payload: success,
  };
};

/**
 * @public
 */
export const createRavenNodeEventFailure = (error: any) => {
  return {
    type: CREATE_RAVEN_NODE_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const assignRavenRootNodeDetails = (nodeDetailObj: any) => {
  return {
    type: ASSIGN_ROOT_NODE_DETAILS,
    payload: nodeDetailObj,
  };
};

/**
 * @public
 */
export const fetchRavenTicketEventsRequest = () => {
  return {
    type: FETCH_RAVEN_TICKET_REQUEST,
  };
};

/**
 * @public
 */
export const fetchRavenTicketEventsSuccess = (nodes: Array<any>) => {
  return {
    type: FETCH_RAVEN_TICKET_SUCCESS,
    payload: nodes,
  };
};

/**
 * @public
 */
export const fetchRavenTicketEventsFailure = (error: any) => {
  return {
    type: FETCH_RAVEN_TICKET_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const fetchRavenMetaDataRequest = () => {
  return {
    type: FETCH_RAVEN_METADATA_REQUEST,
  };
};

/**
 * @public
 */
export const fetchRavenMetaDataSuccess = (nodes: Array<any>) => {
  return {
    type: FETCH_RAVEN_METADATA_SUCCESS,
    payload: nodes,
  };
};

/**
 * @public
 */
export const fetchRavenMetaDataFailure = (error: any) => {
  return {
    type: FETCH_RAVEN_METADATA_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const fetchLinkedRavenNodeEventRequest = () => {
  return {
    type: FETCH_LINKED_RAVEN_NODE_REQUEST,
  };
};

/**
 * @public
 */
export const fetchLinkedRavenNodeEventSuccess = (nodeObjs: Array<any>) => {
  return {
    type: FETCH_LINKED_RAVEN_NODE_SUCCESS,
    payload: nodeObjs,
  };
};

/**
 * @public
 */
export const fetchLinkedRavenNodeEventFailure = (error: any) => {
  return {
    type: FETCH_LINKED_RAVEN_NODE_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const updateRavenNodeEventRequest = () => {
  return {
    type: UPDATE_RAVEN_NODE_REQUEST,
  };
};

/**
 * @public
 */
export const updateRavenNodeEventSuccess = (success: boolean) => {
  return {
    type: UPDATE_RAVEN_NODE_SUCCESS,
    payload: success,
  };
};

/**
 * @public
 */
export const updateRavenNodeEventFailure = (error: any) => {
  return {
    type: UPDATE_RAVEN_NODE_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const updateRavenRankEventRequest = () => {
  return {
    type: UPDATE_RAVEN_NODE_RANK_REQUEST,
  };
};

/**
 * @public
 */
export const updateRavenRankEventSuccess = (success: boolean) => {
  return {
    type: UPDATE_RAVEN_NODE_RANK_SUCCESS,
    payload: success,
  };
};

/**
 * @public
 */
export const updateRavenRankEventFailure = (error: any) => {
  return {
    type: UPDATE_RAVEN_NODE_RANK_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const addRavenNodeEventRequest = () => {
  return {
    type: ADD_RAVEN_NODE_REQUEST,
  };
};

/**
 * @public
 */
export const addRavenNodeEventSuccess = (success: any) => {
  return {
    type: ADD_RAVEN_NODE_SUCCESS,
    payload: success,
  };
};

/**
 * @public
 */
export const addRavenNodeEventFailure = (error: any) => {
  return {
    type: ADD_RAVEN_NODE_FAILURE,
    payload: error,
  };
};

/**
 * @public
 */
export const fetchRavenRootNodeEventsRequest = () => {
  return {
    type: FETCH_RAVEN_ROOT_NODES_REQUEST,
  };
};

/**
 * @public
 */
export const fetchRavenRootNodeEventsSuccess = (nodes: Array<any>) => {
  return {
    type: FETCH_RAVEN_ROOT_NODES_SUCCESS,
    payload: nodes,
  };
};

/**
 * @public
 */
export const fetchRavenRootNodeEventsFailure = (error: any) => {
  return {
    type: FETCH_RAVEN_ROOT_NODES_FAILURE,
    payload: error,
  };
};

/**
 * action to set rank for particular node id in store
 * @param {string} rank - node rank
 * @param {string} id - node id which rank want to change
 */
export const onChangeNodeRank = (rank: string, id: string) => ({
  type: UPDATE_CHANGE_NODE_RANK,
  payload: {
    node_id: id,
    node_rank: rank,
  },
});

/**
 * action to set current parent key by opening panel
 * @param {string} key - current opened panel key
 */
export const setCurrentNodekey = (key: string | null) => ({
  type: SET_CURRENT_NODE_KEY,
  payload: key,
});

/**
 * Method to create node event from Node API
 * @param  {string} accessToken AccessToken for user
 * @param  {object} payload
 */
export const createNodeEvent = (accessToken: string, payload: any) => {
  return (dispatch: RavenRootNodeDispatchType) => {
    dispatch(createRavenNodeEventRequest());
    return axios
      .post(
        `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        const success = response?.data?.success;
        dispatch(createRavenNodeEventSuccess(success));
        if (success) toast.success('Create Node request sent successfully !');
      })
      .catch((error: any) => {
        toast.error(
          `Failed to Create Node Event ${error?.response?.data?.error}`
        );
        dispatch(createRavenNodeEventFailure(error?.response?.data?.error));
      });
  };
};

/**
 * Method to fetch raven root node events from Node API
 * (Currently fetches in chunks of 200 (fetched all))
 * @param  {string} accessToken AccessToken for user
 * @param  {number} currentPageSize Current page size of existing nodes fetched
 * @param  {number} pageStart size to be started with
 */
export const fetchRavenRootNodes = (
  accessToken: string,
  currentPageSize: number,
  pageStart: number
) => {
  return (dispatch: RavenRootNodeDispatchType) => {
    dispatch(fetchRavenRootNodeEventsRequest());
    return axios
      .get(
        `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/nodes/root?app_name=PHARMACY&size=${currentPageSize}&start=${pageStart}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        const nodes = response?.data?.result;
        toast.success('Fetched Raven Root Nodes Successfully!');
        dispatch(fetchRavenRootNodeEventsSuccess(nodes));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to Fetch Root Node Events ${error?.response?.data?.error}`
        );
        dispatch(fetchRavenRootNodeEventsFailure(error?.response?.data?.error));
      });
  };
};

/**
 * Method to update node events from Node API
 * @param  {string} accessToken AccessToken for user
 * @param  {object} payload
 */
export const updateNodeEvent = (accessToken: string, payload: any) => {
  return (dispatch: RavenRootNodeDispatchType) => {
    dispatch(updateRavenNodeEventRequest());
    return axios
      .put(
        `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        const success = response?.data?.success;
        toast.success('Successfully Updated Node Event');
        dispatch(updateRavenNodeEventSuccess(success));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to Update Node Event ${error?.response?.data?.error}`
        );
        dispatch(updateRavenNodeEventFailure(error?.response?.data?.error));
      });
  };
};

/**
 * Method to update rank event from Node API
 * @param  {string} accessToken AccessToken for user
 * @param  {object} payload
 */
export const updateRankEvent = (accessToken: string, payload: any) => {
  return (dispatch: RavenRootNodeDispatchType) => {
    dispatch(updateRavenRankEventRequest());
    return axios
      .put(
        `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node/rank`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        const success = response?.data?.success;
        toast.success('Successfully Updated Rank');
        dispatch(updateRavenRankEventSuccess(success));
      })
      .catch((error: any) => {
        toast.error(`Failed to Update Rank ${error?.response?.data?.error}`);
        dispatch(updateRavenRankEventFailure(error?.response?.data?.error));
      });
  };
};

/**
 * Method to fetch linked node events for action
 * @param  {string} accessToken AccessToken for user
 * @param  {actionId} actionId  Node Action Id
 */
export const getLinkedNodeEvents = (accessToken: string, actionId: string) => {
  return (dispatch: RavenRootNodeDispatchType) => {
    dispatch(fetchLinkedRavenNodeEventRequest());
    return axios
      .get(
        `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node/linked?node_action=${actionId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        const nodes = response?.data?.result;
        dispatch(fetchLinkedRavenNodeEventSuccess(nodes));
      })
      .catch(() => {
        dispatch(fetchLinkedRavenNodeEventFailure('No Linked Nodes'));
      });
  };
};

/**
 * Method to create child node events from Node API
 * @param  {string} accessToken AccessToken for user
 * @param  {object} payload
 */
export const createChildNodeEvent = (accessToken: string, payload: any) => {
  return (dispatch: RavenRootNodeDispatchType) => {
    dispatch(addRavenNodeEventRequest());
    return axios
      .post(
        `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/node/child`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        const success = response?.data?.success;
        dispatch(addRavenNodeEventSuccess(success));
        if (success) toast.success(`Add node request sent sucessfully !`);
      })
      .catch((error: any) => {
        toast.error(
          `Failed to Add New Node Event ${error?.response?.data?.error}`
        );
        dispatch(addRavenNodeEventFailure(error?.response?.data?.error));
      });
  };
};

/**
 * Method to fetch raven ticket events from Node API
 * @param  {string} accessToken AccessToken for user
 */
export const fetchRavenTickets = (accessToken: string) => {
  return (dispatch: RavenRootNodeDispatchType) => {
    dispatch(fetchRavenTicketEventsRequest());
    return axios
      .get(`${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/ticket`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((response: any) => {
        const ticketArr = response?.data?.result;
        dispatch(fetchRavenTicketEventsSuccess(ticketArr));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to Fetch Raven Ticket Data ${error?.response?.data?.error}`
        );
        dispatch(fetchRavenTicketEventsFailure(error?.response?.data?.error));
      });
  };
};

/**
 * Method to fetch raven metadata from Node API
 * @param  {string} accessToken AccessToken for user
 */
export const fetchRavenMetaData = (accessToken: string) => {
  return (dispatch: RavenRootNodeDispatchType) => {
    dispatch(fetchRavenMetaDataRequest());
    return axios
      .get(
        `${AppConfig.serverDomain}${AppConfig.ravenAppEndpoint}/nodes/metadata`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((response: any) => {
        const metaData = response?.data?.result;
        dispatch(fetchRavenMetaDataSuccess(metaData));
      })
      .catch((error: any) => {
        toast.error(
          `Failed to Fetch Raven MetaData ${error?.response?.data?.error}`
        );
        dispatch(fetchRavenMetaDataFailure(error?.response?.data?.error));
      });
  };
};
