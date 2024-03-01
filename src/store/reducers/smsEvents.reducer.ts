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

const initialState: ISMSEventState = {
  loading: false,
  error: '',
  sms_templates: [],
  sms_id_templates: [],
  total_count: 0,
  success: false,
  loadingPreview: false,
  sms_previews: [],
};

const smsEventsReducer = (
  state = initialState,
  action: SMSEventAction
): any => {
  switch (action.type) {
    case FETCH_SMS_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_SMS_TEMPLATES_SUCCESS:
      return {
        ...state,
        loading: false,
        total_count: action.payload?.length,
        sms_id_templates: action.payload,
      };
    case FETCH_SMS_TEMPLATES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        sms_id_templates: [],
      };

    case FETCH_SMS_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        sms_templates: action.payload,
      };

    case FETCH_SMS_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PREVIEW_SMS_EVENTS_REQUEST:
      return {
        ...state,
        loadingPreview: true,
        sms_previews: [],
        error: '',
      };

    case PREVIEW_SMS_EVENTS_SUCCESS:
      return {
        ...state,
        sms_previews: action.payload,
        loadingPreview: false,
      };

    case PREVIEW_SMS_EVENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loadingPreview: false,
        sms_previews: [],
      };

    case UPDATE_SMS_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
        sms_templates: [],
      };

    case UPDATE_SMS_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };

    case UPDATE_SMS_EVENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default smsEventsReducer;
