import {
  ADD_RAVEN_NODE_ACTION_FAILURE,
  ADD_RAVEN_NODE_ACTION_REQUEST,
  ADD_RAVEN_NODE_ACTION_SUCCESS,
  ADD_RAVEN_NODE_FAILURE,
  ADD_RAVEN_NODE_REQUEST,
  ADD_RAVEN_NODE_SUCCESS,
  ASSIGN_ROOT_NODE_DETAILS,
  CHANGE_RAVEN_NODE_ACTION_FAILURE,
  CHANGE_RAVEN_NODE_ACTION_REQUEST,
  CHANGE_RAVEN_NODE_ACTION_SUCCESS,
  CREATE_RAVEN_NODE_FAILURE,
  CREATE_RAVEN_NODE_REQUEST,
  CREATE_RAVEN_NODE_SUCCESS,
  FETCH_LINKED_RAVEN_NODE_FAILURE,
  FETCH_LINKED_RAVEN_NODE_REQUEST,
  FETCH_LINKED_RAVEN_NODE_SUCCESS,
  FETCH_RAVEN_ACTIONS_NODES_FAILURE,
  FETCH_RAVEN_ACTIONS_NODES_REQUEST,
  FETCH_RAVEN_ACTIONS_NODES_SUCCESS,
  FETCH_RAVEN_INACTIVE_NODE_LINKS_FAILURE,
  FETCH_RAVEN_INACTIVE_NODE_LINKS_REQUEST,
  FETCH_RAVEN_INACTIVE_NODE_LINKS_SUCCESS,
  FETCH_RAVEN_METADATA_FAILURE,
  FETCH_RAVEN_METADATA_REQUEST,
  FETCH_RAVEN_METADATA_SUCCESS,
  FETCH_RAVEN_NODES_FAILURE,
  FETCH_RAVEN_NODES_REQUEST,
  FETCH_RAVEN_NODES_SUCCESS,
  FETCH_RAVEN_ROOT_NODES_FAILURE,
  FETCH_RAVEN_ROOT_NODES_REQUEST,
  FETCH_RAVEN_ROOT_NODES_SUCCESS,
  FETCH_RAVEN_TICKET_FAILURE,
  FETCH_RAVEN_TICKET_REQUEST,
  FETCH_RAVEN_TICKET_SUCCESS,
  SEND_RAVEN_NODE_LINK_FAILURE,
  SEND_RAVEN_NODE_LINK_REQUEST,
  SEND_RAVEN_NODE_LINK_SUCCESS,
  SET_CURRENT_NODE_KEY,
  UPDATE_CHANGE_NODE_RANK,
  UPDATE_RAVEN_NODE_FAILURE,
  UPDATE_RAVEN_NODE_RANK_FAILURE,
  UPDATE_RAVEN_NODE_RANK_REQUEST,
  UPDATE_RAVEN_NODE_RANK_SUCCESS,
  UPDATE_RAVEN_NODE_REQUEST,
  UPDATE_RAVEN_NODE_SUCCESS,
} from '../constants';

const initialState: IRavenRootNodeState = {
  loading: false,
  updateSuccess: false,
  createSuccess: false,
  toggleUpdateSuccess: false,
  error: '',
  success: false,
  rootNodeDetails: null,
  addNodeSuccess: false,
  changeActionSuccess: false,
  updateRankSuccess: false,
  editNodeDetails: null,
  createNodeSuccess: false,
  linkedNodeDetails: [],
  rootNodes: [],
  inactiveNodes: [],
  nodeActions: [],
  newNodeOptions: [],
  ticketOptions: [],
  ravenMetaInfo: null,
  updatedRank: [],
  currentNodeKey: null,
};

/**
 * function to update rank in store
 * @param {array} rankDetails - object in rank to be update
 * @param {object} data - rank and node id
 */
function updateRank(
  rankDetails: Array<{
    node_id: string;
    node_rank: string;
  }>,
  data: {
    node_id: string;
    node_rank: string;
  }
) {
  const newArray = [...rankDetails];
  let status = false;
  /**
   * to check node id exist or not
   * if exist then update that rank otherwise push in array
   */
  newArray.forEach((value) => {
    if (data.node_id === value.node_id) {
      status = true;
      value.node_rank = data.node_rank;
    }
  });
  if (status === false) {
    newArray.push(data);
  }
  return newArray;
}

const ravenRootEventsReducer = (
  state = initialState,
  action: RavenRootNodeAction
): any => {
  switch (action.type) {
    case ADD_RAVEN_NODE_REQUEST:
      return {
        ...state,
        addNodeSuccess: false,
      };

    case ADD_RAVEN_NODE_SUCCESS:
      return {
        ...state,
        addNodeSuccess: true,
      };

    case ADD_RAVEN_NODE_FAILURE:
      return {
        ...state,
        error: action.payload,
        addNodeSuccess: false,
      };

    case CHANGE_RAVEN_NODE_ACTION_REQUEST:
      return {
        ...state,
        changeActionSuccess: false,
      };

    case CHANGE_RAVEN_NODE_ACTION_SUCCESS:
      return {
        ...state,
        changeActionSuccess: true,
      };

    case CHANGE_RAVEN_NODE_ACTION_FAILURE:
      return {
        ...state,
        error: action.payload,
        changeActionSuccess: false,
      };

    case UPDATE_RAVEN_NODE_RANK_REQUEST:
      return {
        ...state,
        updateRankSuccess: false,
      };

    case UPDATE_RAVEN_NODE_RANK_SUCCESS:
      return {
        ...state,
        updateRankSuccess: true,
      };

    case UPDATE_RAVEN_NODE_RANK_FAILURE:
      return {
        ...state,
        error: action.payload,
        updateRankSuccess: false,
      };
    case UPDATE_CHANGE_NODE_RANK:
      return {
        ...state,
        updatedRank: updateRank([...state.updatedRank], action.payload),
      };
    case SET_CURRENT_NODE_KEY:
      return {
        ...state,
        currentNodeKey: action.payload,
        updatedRank: [],
      };

    case CREATE_RAVEN_NODE_REQUEST:
      return {
        ...state,
        loading: false,
        createNodeSuccess: false,
        error: '',
      };

    case CREATE_RAVEN_NODE_SUCCESS:
      return {
        ...state,
        loading: false,
        createNodeSuccess: true,
        error: '',
      };

    case CREATE_RAVEN_NODE_FAILURE:
      return {
        ...state,
        loading: false,
        createNodeSuccess: false,
        error: action.payload,
      };

    case FETCH_RAVEN_ROOT_NODES_REQUEST:
      return {
        ...state,
        changeActionSuccess: false,
        addNodeSuccess: false,
        createNodeSuccess: false,
        updateRankSuccess: false,
        toggleUpdateSuccess: false,
        createSuccess: false,
        loading: true,
        error: '',
        rootNodes: [],
      };

    case FETCH_RAVEN_ROOT_NODES_SUCCESS:
      return {
        ...state,
        loading: false,
        changeActionSuccess: false,
        addNodeSuccess: false,
        error: '',
        rootNodes: action.payload,
      };
    case FETCH_RAVEN_ROOT_NODES_FAILURE:
      return {
        ...state,
        loading: false,
        addNodeSuccess: false,
        changeActionSuccess: false,
        error: action.payload,
        rootNodes: [],
      };
    case UPDATE_RAVEN_NODE_REQUEST:
      return {
        ...state,
        updateSuccess: false,
      };
    case UPDATE_RAVEN_NODE_SUCCESS:
      return {
        ...state,
        updateSuccess: action.payload,
      };
    case UPDATE_RAVEN_NODE_FAILURE:
      return {
        ...state,
        updateSuccess: false,
        error: action.payload,
      };
    case ADD_RAVEN_NODE_ACTION_REQUEST:
      return {
        ...state,
        createSuccess: false,
      };
    case ADD_RAVEN_NODE_ACTION_SUCCESS:
      return {
        ...state,
        createSuccess: true,
      };
    case ADD_RAVEN_NODE_ACTION_FAILURE:
      return {
        ...state,
        createSuccess: false,
        error: action.payload,
      };

    case FETCH_LINKED_RAVEN_NODE_REQUEST:
      return {
        ...state,
        linkedNodeDetails: [],
      };

    case FETCH_LINKED_RAVEN_NODE_SUCCESS:
      return {
        ...state,
        linkedNodeDetails: action.payload,
      };
    case FETCH_LINKED_RAVEN_NODE_FAILURE:
      return {
        ...state,
        linkedNodeDetails: [],
      };

    case ASSIGN_ROOT_NODE_DETAILS:
      return {
        ...state,
        editNodeDetails: action.payload,
      };
    case FETCH_RAVEN_TICKET_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        ticketOptions: [],
      };

    case FETCH_RAVEN_TICKET_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        ticketOptions: action.payload,
      };
    case FETCH_RAVEN_TICKET_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        ticketOptions: [],
      };
    case FETCH_RAVEN_METADATA_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        ravenMetaInfo: null,
      };

    case FETCH_RAVEN_METADATA_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        ravenMetaInfo: action.payload,
      };
    case FETCH_RAVEN_METADATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        ravenMetaInfo: null,
      };
    case FETCH_RAVEN_ACTIONS_NODES_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        nodeActions: [],
      };

    case FETCH_RAVEN_ACTIONS_NODES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        nodeActions: action.payload,
      };
    case FETCH_RAVEN_ACTIONS_NODES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        nodeActions: [],
      };
    case FETCH_RAVEN_NODES_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        newNodeOptions: [],
      };

    case FETCH_RAVEN_NODES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        newNodeOptions: action.payload,
      };
    case FETCH_RAVEN_NODES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        newNodeOptions: [],
      };
    case FETCH_RAVEN_INACTIVE_NODE_LINKS_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        inactiveNodes: [],
      };

    case FETCH_RAVEN_INACTIVE_NODE_LINKS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: '',
        inactiveNodes: action.payload,
      };
    case FETCH_RAVEN_INACTIVE_NODE_LINKS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        inactiveNodes: [],
      };
    case SEND_RAVEN_NODE_LINK_REQUEST:
      return {
        ...state,
        toggleUpdateSuccess: false,
      };
    case SEND_RAVEN_NODE_LINK_SUCCESS:
      return {
        ...state,
        toggleUpdateSuccess: true,
        success: true,
      };
    case SEND_RAVEN_NODE_LINK_FAILURE:
      return {
        ...state,
        toggleUpdateSuccess: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default ravenRootEventsReducer;
