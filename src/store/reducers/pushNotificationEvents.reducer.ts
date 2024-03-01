import {
  FETCH_PUSH_NOTIFICATION_EVENTS_REQUEST,
  FETCH_PUSH_NOTIFICATION_EVENTS_SUCCESS,
  FETCH_PUSH_NOTIFICATION_EVENTS_FAILURE,
  UPDATE_PUSH_NOTIFICATION_EVENTS_REQUEST,
  UPDATE_PUSH_NOTIFICATION_EVENTS_SUCCESS,
  UPDATE_PUSH_NOTIFICATION_EVENTS_FAILURE,
  FETCH_PUSH_NOTIFICATION_TEMPLATES_SUCCESS,
  FETCH_PUSH_NOTIFICATION_TEMPLATES_FAILURE,
  PREVIEW_PUSH_NOTIFICATION_EVENTS_REQUEST,
  PREVIEW_PUSH_NOTIFICATION_EVENTS_SUCCESS,
  PREVIEW_PUSH_NOTIFICATION_EVENTS_FAILURE,
} from '../constants';

const initialState: IPushEventState = {
  loading: false,
  error: '',
  push_notifications: [],
  push_id_notifications: [],
  total_count: 0,
  success: false,
  push_notification_previews: [],
  loadingPreview: false,
};

const pushNotificationEventsReducer = (
  state = initialState,
  action: PushEventAction
): any => {
  switch (action.type) {
    case FETCH_PUSH_NOTIFICATION_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_PUSH_NOTIFICATION_TEMPLATES_SUCCESS:
      return {
        ...state,
        loading: false,
        total_count: action.payload?.length,
        push_id_notifications: action.payload,
      };
    case FETCH_PUSH_NOTIFICATION_TEMPLATES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        push_id_notifications: [],
      };

    case FETCH_PUSH_NOTIFICATION_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        push_notifications: action.payload,
      };

    case FETCH_PUSH_NOTIFICATION_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PREVIEW_PUSH_NOTIFICATION_EVENTS_REQUEST:
      return {
        ...state,
        loadingPreview: true,
        push_notification_previews: [],
        error: '',
      };

    case PREVIEW_PUSH_NOTIFICATION_EVENTS_SUCCESS:
      return {
        ...state,
        push_notification_previews: action.payload,
        loadingPreview: false,
      };

    case PREVIEW_PUSH_NOTIFICATION_EVENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loadingPreview: false,
        push_notification_previews: [],
      };

    case UPDATE_PUSH_NOTIFICATION_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
        push_notifications: [],
      };

    case UPDATE_PUSH_NOTIFICATION_EVENTS_SUCCESS:
      return {
        ...state,
        success: action.payload,
        loading: false,
      };

    case UPDATE_PUSH_NOTIFICATION_EVENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default pushNotificationEventsReducer;
