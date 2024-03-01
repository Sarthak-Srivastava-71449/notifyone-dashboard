import {
  authenticateUserFailure,
  authenticateUserRequest,
  authenticateUserSuccess,
  userRolesFailure,
  userRolesRequest,
} from '../actions/auth';
import googleReducer from './auth.reducer';

describe('Google Authentication Reducer Test Suite', () => {
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
    roles: {},
  };

  test('should return the initial state', () => {
    expect(googleReducer(undefined, {})).toEqual(initialState);
  });

  test('Should return the same state when authenticateUserRequest action is dispatched', () => {
    expect(googleReducer(undefined, authenticateUserRequest())).toEqual(
      initialState
    );
  });

  test('should return success response when authentication is successful', () => {
    const successPayload = {
      name: 'testuser@1mg.com',
      tokens: { accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IsiJ850c6Q' },
      success: 200,
      loading: false,
      roles: {},
      error: '',
    };
    expect(
      googleReducer(initialState, authenticateUserSuccess(successPayload))
    ).toEqual({
      name: 'testuser@1mg.com',
      success: 200,
      loading: false,
      roles: {},
      tokens: { accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IsiJ850c6Q' },
      error: '',
    });
  });

  test('should return error response when authentication is unsuccessful', () => {
    const errorPayload = {
      error: 'Some Random Backend Error',
    };
    expect(
      googleReducer(initialState, authenticateUserFailure(errorPayload))
    ).toHaveProperty('error', {
      error: 'Some Random Backend Error',
    });
  });

  test('Should return the same state when userRolesRequest action is dispatched', () => {
    expect(googleReducer(undefined, userRolesRequest())).toEqual({
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
      roles: {},
    });
  });

  test('should check if user_info and 1mg user role gets returned response when role fetching is successful', () => {
    const successPayload = {
      user_info: {
        email_id: 'testuser@1mg.com',
        contact_number: '999999999',
        email_verified: true,
      },
      roles: {
        '1mg': ['ROLE_USER'],
      },
    };
    expect(
      googleReducer(initialState, authenticateUserSuccess(successPayload))
    ).toHaveProperty('roles', {
      '1mg': ['ROLE_USER'],
    });

    expect(
      googleReducer(initialState, authenticateUserSuccess(successPayload))
    ).toHaveProperty('user_info', {
      email_id: 'testuser@1mg.com',
      contact_number: '999999999',
      email_verified: true,
    });
  });

  test('should return error response when role fetching is unsuccessful', () => {
    const errorPayload = {
      error: 'Some Random Backend Error',
    };
    expect(
      googleReducer(initialState, userRolesFailure(errorPayload))
    ).toHaveProperty('error', { error: 'Some Random Backend Error' });
  });

  test('logout returns the initial state', () => {
    expect(googleReducer(undefined, {})).toEqual(initialState);
  });
});
