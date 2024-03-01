import {
  addRavenNodeActionFailure,
  addRavenNodeActionRequest,
  addRavenNodeActionSuccess,
  changeRavenNodeActionFailure,
  changeRavenNodeActionRequest,
  changeRavenNodeActionSuccess,
  fetchRavenNodeActionEventsFailure,
  fetchRavenNodeActionEventsRequest,
  fetchRavenNodeActionEventsSuccess,
} from 'src/store/actions/ravenActionNodeEvents';
import {
  fetchRavenInactiveNodeLinksFailure,
  fetchRavenInactiveNodeLinksRequest,
  fetchRavenInactiveNodeLinksSuccess,
  fetchRavenNodeEventsFailure,
  fetchRavenNodeEventsRequest,
  fetchRavenNodeEventsSuccess,
  sendRavenNodeLinkFailure,
  sendRavenNodeLinkRequest,
  sendRavenNodeLinkSuccess,
} from 'src/store/actions/ravenNodeEvents';
import {
  addRavenNodeEventFailure,
  addRavenNodeEventRequest,
  addRavenNodeEventSuccess,
  assignRavenRootNodeDetails,
  createRavenNodeEventFailure,
  createRavenNodeEventRequest,
  createRavenNodeEventSuccess,
  fetchLinkedRavenNodeEventFailure,
  fetchLinkedRavenNodeEventRequest,
  fetchLinkedRavenNodeEventSuccess,
  fetchRavenMetaDataFailure,
  fetchRavenMetaDataRequest,
  fetchRavenMetaDataSuccess,
  fetchRavenRootNodeEventsFailure,
  fetchRavenRootNodeEventsRequest,
  fetchRavenRootNodeEventsSuccess,
  fetchRavenTicketEventsFailure,
  fetchRavenTicketEventsRequest,
  fetchRavenTicketEventsSuccess,
  onChangeNodeRank,
  setCurrentNodekey,
  updateRavenNodeEventFailure,
  updateRavenNodeEventRequest,
  updateRavenNodeEventSuccess,
  updateRavenRankEventFailure,
  updateRavenRankEventRequest,
  updateRavenRankEventSuccess,
} from 'src/store/actions/ravenRootNodeEvents';
import ravenRootEventsReducer from '../ravenRootNodeEvents.reducer';

describe('Raven RootNode Events Test Suit', () => {
  const initialState: IRavenRootNodeState = {
    loading: false,
    error: '',
    success: false,
    rootNodes: [],
    inactiveNodes: [],
    nodeActions: [],
    newNodeOptions: [],
    ticketOptions: [],
    ravenMetaInfo: null,
    editNodeDetails: null,
    linkedNodeDetails: [],
    createNodeSuccess: false,
    rootNodeDetails: null,
    addNodeSuccess: false,
    changeActionSuccess: false,
    updateSuccess: false,
    createSuccess: false,
    toggleUpdateSuccess: false,
    updatedRank: [],
    currentNodeKey: null,
    updateRankSuccess: false,
  };

  //Initial State

  test('should return the initial state', () => {
    expect(ravenRootEventsReducer(undefined, {})).toEqual(initialState);
  });

  // Fetch Raven Action Events  Request Test Function

  test('should change loading when fetch raven action events resource', () => {
    expect(
      ravenRootEventsReducer(initialState, fetchRavenNodeActionEventsRequest())
    ).toEqual({
      ...initialState,
      loading: true,
      error: '',
      success: false,
    });
  });

  //Fetch Raven Action Events Success Test Function

  test('should update state when FETCH_RAVEN_ROOT_NODES_SUCCESS action is dispatched', () => {
    expect(
      ravenRootEventsReducer(
        initialState,
        fetchRavenNodeActionEventsSuccess([])
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
    });
  });

  // Fetch Raven Action Events Failed Test Function

  test('should test for error while fetching resources', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      ravenRootEventsReducer(
        initialState,
        fetchRavenNodeActionEventsFailure(randomError)
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  // Fetch Raven Ticket Events Request Test Function

  test('should change loading when fetch raven ticket events resource', () => {
    expect(
      ravenRootEventsReducer(initialState, fetchRavenTicketEventsRequest())
    ).toEqual({
      ...initialState,
      loading: true,
      error: '',
      success: false,
    });
  });

  //Fetch Raven Ticket Events Success Test Function

  test('should update state when FETCH_RAVEN_TICKET_SUCCESS action is dispatched', () => {
    expect(
      ravenRootEventsReducer(initialState, fetchRavenTicketEventsSuccess([]))
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
    });
  });

  // Fetch Raven Ticket Events Failed Test Function

  test('should test for error while fetching resources', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      ravenRootEventsReducer(
        initialState,
        fetchRavenTicketEventsFailure(randomError)
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  // Fetch Raven Meta Data Request Test Function

  test('should change loading when fetch raven metaData resource', () => {
    expect(
      ravenRootEventsReducer(initialState, fetchRavenMetaDataRequest())
    ).toEqual({
      ...initialState,
      loading: true,
      error: '',
      success: false,
    });
  });

  //Fetch Raven Meta Data Success Test Function

  test('should update state when FETCH_RAVEN_METADATA_SUCCESS action is dispatched', () => {
    expect(
      ravenRootEventsReducer(initialState, fetchRavenMetaDataSuccess([]))
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
      ravenMetaInfo: [],
    });
  });

  // Fetch Raven Meta Data Failed Test Function

  test('should test for error while fetching resources', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      ravenRootEventsReducer(
        initialState,
        fetchRavenMetaDataFailure(randomError)
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  // Fetch Raven Root Node Request Test Function

  test('should change loading when fetch raven root node resource', () => {
    expect(
      ravenRootEventsReducer(initialState, fetchRavenRootNodeEventsRequest())
    ).toEqual({
      ...initialState,
      loading: true,
      error: '',
      success: false,
    });
  });

  //Fetch Raven Root Node Success Test Function

  test('should update state when FETCH_RAVEN_ROOT_NODES_SUCCESS action is dispatched', () => {
    expect(
      ravenRootEventsReducer(initialState, fetchRavenRootNodeEventsSuccess([]))
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
    });
  });

  // Fetch Raven Root Node Failed Test Function

  test('should test for error while fetching resources', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      ravenRootEventsReducer(
        initialState,
        fetchRavenRootNodeEventsFailure(randomError)
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  // Fetch Raven Intractive Node Links Request Test Function

  test('should change loading when fetch raven intractive links resource', () => {
    expect(
      ravenRootEventsReducer(initialState, fetchRavenInactiveNodeLinksRequest())
    ).toEqual({
      ...initialState,
      loading: true,
      error: '',
      success: false,
    });
  });

  //Fetch Raven Intractive Node Links Success Test Function

  test('should update state when FETCH_RAVEN_INACTIVE_NODE_LINKS_SUCCESS action is dispatched', () => {
    expect(
      ravenRootEventsReducer(
        initialState,
        fetchRavenInactiveNodeLinksSuccess([])
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
    });
  });

  // Fetch Raven Intractive Node Links Failed Test Function

  test('should test for error while fetching resources', () => {
    const randomError = '';
    expect(
      ravenRootEventsReducer(
        initialState,
        fetchRavenInactiveNodeLinksFailure(randomError)
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  // Send Root Node Link Events Request Test Function

  test('should change loading when fetch send root node link events resource', () => {
    expect(
      ravenRootEventsReducer(initialState, sendRavenNodeLinkRequest())
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
    });
  });

  //Send Root Node Link Events Success Test Function

  test('should update state when SEND_RAVEN_NODE_LINK_SUCCESS action is dispatched', () => {
    expect(
      ravenRootEventsReducer(initialState, sendRavenNodeLinkSuccess())
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: true,
      toggleUpdateSuccess: true,
    });
  });

  // Cad Search History Failed Test Function

  test('should test for error while fetching resources', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      ravenRootEventsReducer(
        initialState,
        sendRavenNodeLinkFailure(randomError)
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  //Fetch Raven Nodes Events Success Test Function

  test('should update state when FETCH_RAVEN_NODES_SUCCESS action is dispatched', () => {
    expect(
      ravenRootEventsReducer(initialState, fetchRavenNodeEventsSuccess([]))
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
    });
  });

  // Fetch Raven Nodes Events Failed Test Function

  test('should test for error while fetching resources', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      ravenRootEventsReducer(
        initialState,
        fetchRavenNodeEventsFailure(randomError)
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  // Add Raven Node Events Request Test Function

  test('should change loading when fetch add raven node events resource', () => {
    expect(
      ravenRootEventsReducer(initialState, addRavenNodeEventRequest())
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
    });
  });

  //Add Raven Node Events Success Test Function

  test('should update state when ADD_RAVEN_NODE_SUCCESS action is dispatched', () => {
    expect(
      ravenRootEventsReducer(initialState, addRavenNodeEventSuccess(''))
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
      addNodeSuccess: true,
    });
  });

  // Add Raven Node Events Failed Test Function

  test('should test for error while fetching resources', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      ravenRootEventsReducer(
        initialState,
        addRavenNodeEventFailure(randomError)
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  // Change Raven Node Request Test Function

  test('should change loading when fetch change raven node resource', () => {
    expect(
      ravenRootEventsReducer(initialState, changeRavenNodeActionRequest())
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
    });
  });

  //Change Raven Node Success Test Function

  test('should update state when CHANGE_RAVEN_NODE_ACTION_SUCCESS action is dispatched', () => {
    expect(
      ravenRootEventsReducer(initialState, changeRavenNodeActionSuccess())
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      changeActionSuccess: true,
      success: false,
    });
  });

  // Change Raven Node Failed Test Function

  test('should test for error while fetching resources', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      ravenRootEventsReducer(
        initialState,
        changeRavenNodeActionFailure(randomError)
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  // Create Raven Node  Request Test Function

  test('should change loading when fetch cad search history resource', () => {
    expect(
      ravenRootEventsReducer(initialState, createRavenNodeEventRequest())
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
    });
  });

  //Create Raven Node Success Test Function

  test('should update state when CREATE_RAVEN_NODE_SUCCESS action is dispatched', () => {
    expect(
      ravenRootEventsReducer(initialState, createRavenNodeEventSuccess(true))
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
      createNodeSuccess: true,
    });
  });

  // Create Raven Node Failed Test Function

  test('should test for error while fetching resources', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      ravenRootEventsReducer(
        initialState,
        createRavenNodeEventFailure(randomError)
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  // Update Raven Node Request Test Function

  test('should change loading when fetch update raven node events resource', () => {
    expect(
      ravenRootEventsReducer(initialState, updateRavenNodeEventRequest())
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
    });
  });

  //Update Raven Node Success Test Function

  test('should update state when UPDATE_RAVEN_NODE_SUCCESS action is dispatched', () => {
    expect(
      ravenRootEventsReducer(initialState, updateRavenNodeEventSuccess(true))
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
      updateSuccess: true,
    });
  });

  // Update Raven Node Failed Test Function

  test('should test for error while fetching resources', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      ravenRootEventsReducer(
        initialState,
        updateRavenNodeEventFailure(randomError)
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  // Add Raven Node Action Request Test Function

  test('should change loading when fetch add raven node action resource', () => {
    expect(
      ravenRootEventsReducer(initialState, addRavenNodeActionRequest())
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
    });
  });

  //Add Raven Node Action Success Test Function

  test('should update state when ADD_RAVEN_NODE_ACTION_SUCCESS action is dispatched', () => {
    expect(
      ravenRootEventsReducer(initialState, addRavenNodeActionSuccess())
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
      createSuccess: true,
    });
  });

  // Add Raven Node Action Failed Test Function

  test('should test for error while fetching resources', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      ravenRootEventsReducer(
        initialState,
        addRavenNodeActionFailure(randomError)
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  // Linked Raven Node Request Test Function

  test('should change loading when fetch linked raven node events resource', () => {
    expect(
      ravenRootEventsReducer(initialState, fetchLinkedRavenNodeEventRequest())
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
    });
  });

  // Linked Raven Node Success Test Function

  test('should update state when FETCH_LINKED_RAVEN_NODE_SUCCESS action is dispatched', () => {
    expect(
      ravenRootEventsReducer(initialState, fetchLinkedRavenNodeEventSuccess([]))
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
    });
  });

  // Linked Raven Node Failed Test Function

  test('should test for error while fetching resources', () => {
    const randomError = '';
    expect(
      ravenRootEventsReducer(
        initialState,
        fetchLinkedRavenNodeEventFailure(randomError)
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  // Assign Root Node Detailes Request Test Function

  test('should change loading when fetch assign root node detailes resource', () => {
    expect(
      ravenRootEventsReducer(initialState, assignRavenRootNodeDetails([]))
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
      editNodeDetails: [],
    });
  });

  // Fetch Raven Node Event Request Test Function

  test('should change loading when fetch raven node event resource', () => {
    expect(
      ravenRootEventsReducer(initialState, fetchRavenNodeEventsRequest())
    ).toEqual({
      ...initialState,
      loading: true,
      error: '',
      success: false,
    });
  });

  //Fetch Raven Node Event Success Test Function

  test('should update state when FETCH_RAVEN_NODES_SUCCESS action is dispatched', () => {
    expect(
      ravenRootEventsReducer(initialState, fetchRavenNodeEventsSuccess([]))
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
    });
  });

  //Fetch Raven Node Event Failed Test Function

  test('should test for error while fetching resources', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      ravenRootEventsReducer(
        initialState,
        fetchRavenNodeEventsFailure(randomError)
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  // Update Raven Rank Event Request Test Function

  test('should change loading when fetch update raven rank event resource', () => {
    expect(
      ravenRootEventsReducer(initialState, updateRavenRankEventRequest())
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
    });
  });

  // Update Raven Rank Event Success Test Function

  test('should update state when UPDATE_RAVEN_NODE_RANK_SUCCESS action is dispatched', () => {
    expect(
      ravenRootEventsReducer(initialState, updateRavenRankEventSuccess(true))
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
      updateRankSuccess: true,
    });
  });

  // Update Raven Rank Event Failed Test Function

  test('should test for error while fetching resources', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      ravenRootEventsReducer(
        initialState,
        updateRavenRankEventFailure(randomError)
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  // OnChange Node Raven Rank Test Cases

  test('should change loading when fetch onChange node rank resource', () => {
    expect(
      ravenRootEventsReducer(initialState, onChangeNodeRank('', ''))
    ).toEqual({
      ...initialState,
      loading: false,
      error: '',
      success: false,
      updatedRank: [
        {
          node_id: '',
          node_rank: '',
        },
      ],
    });
  });

  // Set Current Node Key Test Cases

  test('should change loading when fetch set current node key resource', () => {
    expect(ravenRootEventsReducer(initialState, setCurrentNodekey(''))).toEqual(
      {
        ...initialState,
        loading: false,
        error: '',
        success: false,
        updatedRank: [],
        currentNodeKey: '',
      }
    );
  });
});
