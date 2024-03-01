import {
  ADD_EVENT_TO_CURRENT_EVENT,
  REMOVE_EVENT_TO_CURRENT_EVENT,
  TOGGLE_ACTION_DATA_SUCCESS,
  TOGGLE_ACTION_DATA_FAILURE,
  TOGGLE_ACTION_DATA_REQUEST,
  SWITCH_CURRENT_EVENT_LOADING,
} from '../constants';

const initialState: ICurrentEventState = {
  loading: false,
  error: '',
  current_event: null,
};

const updateToggleForCurrentEvent = (currentEvent: any, updatePayload: any) => {
  const x = {
    ...currentEvent,
    actions: updatePayload,
  };
  return x;
};

const currentEventsReducer = (
  state = initialState,
  action: CurrentAction
): any => {
  switch (action.type) {
    case SWITCH_CURRENT_EVENT_LOADING:
      return {
        ...state,
        loading: action.payload,
      };
    case ADD_EVENT_TO_CURRENT_EVENT:
      return {
        ...state,
        current_event: action.payload,
      };

    case REMOVE_EVENT_TO_CURRENT_EVENT:
      return {
        ...state,
        current_event: null,
      };

    case TOGGLE_ACTION_DATA_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case TOGGLE_ACTION_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        current_event: updateToggleForCurrentEvent(
          { ...state.current_event },
          action.payload
        ),
      };

    case TOGGLE_ACTION_DATA_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default currentEventsReducer;
