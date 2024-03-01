import {
  AUTHENTICATE_USER_FAILURE,
  AUTHENTICATE_USER_REQUEST,
  AUTHENTICATE_USER_SUCCESS,
  LOGOUT_USER,
  USER_ROLES_REQUEST,
  USER_ROLES_SUCCESS,
  USER_ROLES_FAILURE,
} from '../constants';

const initialState: IUser = {
  loading: false,
  error: '',
  success: false,
  name: '',
  tokens: {
    accessToken: '',
  },
  user_info: {
    email_id: '',
    contact_number: '',
    email_verified: false,
  },
  rootUserSelectedActorType: null,
  rootUserAvailableActorType: [],
  roles: {},
};

const googleReducer = (state = initialState, action: UserAction): any => {
  switch (action.type) {
    case AUTHENTICATE_USER_REQUEST:
      return {
        ...state,
      };

    case AUTHENTICATE_USER_SUCCESS:
      return {
        ...action.payload,
      };

    case AUTHENTICATE_USER_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case USER_ROLES_REQUEST:
      return {
        ...state,
      };

    case USER_ROLES_SUCCESS:
      return {
        ...state,
        ...action.payload,
      };

    case USER_ROLES_FAILURE:
      return {
        ...state,
        error: action.payload,
      };

    case LOGOUT_USER:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};

export default googleReducer;
