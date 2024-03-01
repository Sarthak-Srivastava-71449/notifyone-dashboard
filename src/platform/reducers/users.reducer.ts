import {
  CHANGE_USER_CREDENTIALS,
  ON_VALIDATE_INPUT,
  SHOW_SUCCESS_MESSAGE,
  SUCCESS_BLOCK_UNBLOCK,
  SUCCESS_CLEAR_FIELDS,
  SUCCESS_GET_ERROR,
  GET_USER_INFO_REQUEST,
  SUCCESS_GET_USER_INFO,
  SUCCESS_HIDE_ERRORS,
} from '../constants';

interface userInfoObject {
  email?: string;
  phone?: string;
}
/**
 * Method to create user management object containing email or phone
 * @param  {object} value - phone or email
 */
const createUserObject = (value: any) => {
  let userInfo: userInfoObject = {};
  value = value.trim();
  const isNum = /^\d+$/.test(value);
  if (value === '') {
    userInfo = {};
  } else if (!isNum) {
    userInfo.email = value;
  } else {
    userInfo.phone = value;
  }
  return userInfo;
};
/**
 * Validation function to check if input field is blank
 * @param  {userInfoObject} managementObj Object holding email or phone
 */
const validate = (managementObj: userInfoObject) => {
  let validateResult = true;
  if (Object.keys(managementObj).length === 0) {
    validateResult = false;
  }
  return validateResult;
};
/**
 * Method to empty user info object is there's no value in the textbox
 * @param  {userInfoObject} managementObj contains the email or phone field
 * @param  {Record<string} infoObj - contains current user information
 */
const createUserInfoObj = (
  managementObj: userInfoObject,
  infoObj: Record<string, unknown>
) => {
  let userObj = {};
  if (Object.keys(managementObj).length > 0) {
    userObj = infoObj;
  } else {
    userObj = {};
  }
  return userObj;
};
/**
 * Method to check whether user apis are blocked or not
 * @param  {object} userInfo - all user information data object
 */
const getUserBlockStatus = (userInfo: any) => {
  let blocked = false;
  if (userInfo.suspended) {
    blocked = true;
  }
  return blocked;
};
/**
 * Method to change blocked status message when user checks/unchecks the checkbox
 * @param  {object} userInfo user information object
 */
const getStatusMessage = (userInfo: any) => {
  let status = '';
  if (userInfo.suspended) {
    status = 'Activate';
  } else {
    status = 'Deactivate';
  }
  return status;
};

const initialState: MUserState = {
  loading: false,
  isValid: false,
  managementObj: {},
  userInfo: {},
  managementError: '',
  successMessage: '',
  isBlocked: false,
  blockedStatus: '',
  userEmail: '',
};

const usersReducer = (
  state = initialState,
  action: MUserAction
): MUserState => {
  switch (action.type) {
    case ON_VALIDATE_INPUT:
      return {
        ...state,
        managementObj: createUserObject(action.payload),
        isValid: validate(state.managementObj),
        userInfo: createUserInfoObj(state.managementObj, state.userInfo),
      };

    case GET_USER_INFO_REQUEST:
      return {
        ...state,
        userInfo: {},
        loading: true,
      };

    case SUCCESS_GET_USER_INFO:
      return {
        ...state,
        loading: false,
        userInfo: action.payload,
        isBlocked: getUserBlockStatus(action.payload),
        blockedStatus: getStatusMessage(action.payload),
        userEmail: action.payload.email,
      };
    case SUCCESS_GET_ERROR:
      return {
        ...state,
        loading: false,
        managementError: action.payload,
        userInfo: {},
      };
    case SUCCESS_BLOCK_UNBLOCK:
      return {
        ...state,
        isBlocked: action.payload.option,
        blockedStatus: action.payload.status,
        successMessage: action.payload.message,
      };
    case SUCCESS_HIDE_ERRORS:
      return { ...state, managementError: '', successMessage: '' };
    case SUCCESS_CLEAR_FIELDS:
      return {
        ...state,
        managementObj: {},
        userInfo: {},
        blockedStatus: '',
        isValid: false,
      };
    case SHOW_SUCCESS_MESSAGE:
      return { ...state, successMessage: action.payload };
    case CHANGE_USER_CREDENTIALS:
      return { ...state, userInfo: { ...action.payload } };
    default:
      return state;
  }
};

export default usersReducer;
