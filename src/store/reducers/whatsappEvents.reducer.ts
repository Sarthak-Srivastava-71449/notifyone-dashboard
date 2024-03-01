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

const initialState: IWhatsappState = {
  loading: false,
  error: '',
  success: false,
  total_count: 0,
  whatsapp_templates: [],
  whatsapp_id_templates: [],
};

const whatsAppEventsReducer = (
  state = initialState,
  action: WhatsappAction
): any => {
  switch (action.type) {
    case FETCH_WHATS_APP_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_WHATSAPP_TEMPLATES_SUCCESS:
      return {
        ...state,
        loading: false,
        total_count: action.payload?.length,
        whatsapp_id_templates: action.payload,
      };
    case FETCH_WHATSAPP_TEMPLATES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        whatsapp_id_templates: [],
      };

    case FETCH_WHATS_APP_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        whatsapp_templates: action.payload,
      };

    case FETCH_WHATS_APP_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case UPDATE_WHATS_APP_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
        whatsapp_templates: [],
      };

    case UPDATE_WHATS_APP_EVENTS_SUCCESS:
      return {
        ...state,
        success: action.payload,
        loading: false,
      };

    case UPDATE_WHATS_APP_EVENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default whatsAppEventsReducer;
