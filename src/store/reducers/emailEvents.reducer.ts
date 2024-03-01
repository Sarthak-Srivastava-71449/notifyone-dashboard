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
  FETCH_EMAIL_ID_TEMPLATES_SUCCESS,
  FETCH_EMAIL_ID_TEMPLATES_FAILURE,
  FETCH_EMAIL_ID_TEMPLATES_REQUEST,
} from '../constants';

const initialState: IEmailEventState = {
  loading: false,
  error: '',
  total_count: 0,
  email_templates: [],
  email_id_templates: [],
  included_templates: [],
  email_previews: [],
  included_previews: [],
  loadingPreview: false,
  success: false,
};

const emailEventsReducer = (state = initialState, action: EmailAction): any => {
  switch (action.type) {
    case FETCH_EMAIL_ID_TEMPLATES_REQUEST:
      return {
        ...state,
        loading: true,
        email_id_templates: [],
        email_previews: [],
        error: '',
      };

    case FETCH_EMAIL_ID_TEMPLATES_SUCCESS:
      return {
        ...state,
        loading: false,
        total_count: action.payload?.length,
        email_id_templates: action.payload,
      };

    case FETCH_EMAIL_ID_TEMPLATES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
        email_id_templates: [],
      };

    case CLEAR_EMAIL_EVENT:
      return {
        ...state,
        included_templates: [],
      };

    case FETCH_EMAIL_EVENT_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
      };

    case FETCH_EMAIL_EVENT_SUCCESS:
      return {
        ...state,
        loading: false,
        included_templates: action.payload,
      };

    case FETCH_EMAIL_EVENT_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case FETCH_EMAIL_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
        error: '',
        email_previews: [],
      };

    case FETCH_EMAIL_EVENTS_SUCCESS:
      return {
        ...state,
        loading: false,
        email_templates: action.payload,
      };

    case FETCH_EMAIL_EVENTS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case PREVIEW_EMAIL_TEMPLATE_REQUEST:
      return {
        ...state,
        error: '',
      };

    case PREVIEW_EMAIL_TEMPLATE_SUCCESS:
      return {
        ...state,
        included_previews: action.payload,
      };

    case PREVIEW_EMAIL_TEMPLATE_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case PREVIEW_EMAIL_EVENTS_REQUEST:
      return {
        ...state,
        loadingPreview: true,
        email_previews: [],
        error: '',
      };

    case PREVIEW_EMAIL_EVENTS_SUCCESS:
      return {
        ...state,
        email_previews: action.payload,
        loadingPreview: false,
      };

    case PREVIEW_EMAIL_EVENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loadingPreview: false,
        email_previews: [],
      };

    case UPDATE_EMAIL_EVENTS_REQUEST:
      return {
        ...state,
        loading: true,
        email_templates: [],
        email_previews: [],
        error: '',
      };

    case UPDATE_EMAIL_EVENTS_SUCCESS:
      return {
        ...state,
        success: action.payload,
        loading: false,
      };

    case UPDATE_EMAIL_EVENTS_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default emailEventsReducer;
