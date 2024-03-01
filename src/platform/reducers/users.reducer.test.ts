import {
  onClearFields,
  onGetUserInfoRequest,
  onHandleChange,
  onGetUserInfo,
  onRemoveErrors,
  onGetError,
  onBlockUnBlock,
  onShowSuccessMessage,
  changeUserDetails,
} from '../actions/users';
import usersReducer from './users.reducer';

describe('User Management Reducer Test Suite', () => {
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

  test('should return the initial state', () => {
    expect(usersReducer(undefined, {})).toEqual(initialState);
  });

  test('should clear state when onClearFields gets dispatched', () => {
    expect(
      usersReducer(
        {
          loading: false,
          isValid: false,
          managementObj: {
            fakeTag: 'Hello',
          },
          userInfo: {
            fakeAttr: 'Test',
          },
          managementError: '',
          successMessage: '',
          isBlocked: false,
          blockedStatus: '',
          userEmail: '',
        },
        onClearFields()
      )
    ).toEqual(initialState);
  });

  test('should validate input for phone and email', () => {
    const phoneNumber = '999772729';
    const email = 'testuser@1mg.com';

    // Check for phone
    expect(
      usersReducer(initialState, onHandleChange(phoneNumber))
    ).toHaveProperty('managementObj', {
      phone: phoneNumber,
    });

    // Check for email
    expect(usersReducer(initialState, onHandleChange(email))).toHaveProperty(
      'managementObj',
      {
        email: email,
      }
    );
  });

  test('should return loading as true when request is being made', () => {
    // Check for phone
    expect(usersReducer(initialState, onGetUserInfoRequest())).toHaveProperty(
      'loading',
      true
    );
  });

  test('should check for attributes when a successful user search action is dispatched', () => {
    const successUserInfo = {
      last_login: 1650623102,
      email_verified: true,
      is_guest: false,
      roles: {
        WALLET_APP: ['WALLET_ADMIN'],
        LARA_APP: ['LARA_ADMIN'],
        vmg_app: ['ROLE_ADMIN'],
        dmg_app: ['ROLE_ADMIN'],
        '1mg': ['ROLE_USER'],
      },
      email: 'test.user@1mg.com',
      is_migrated: false,
      external_id: '',
      created_on: 1644983443,
      authentication_token: '99f3089d-c58e-4474-b1d7-e6b3503123f009',
      suspended_on: null,
      number: '99993223293',
      verified: true,
      suspended: false,
      corporate_client: '1mg',
      updated_on: 1650630866,
      tata_customer_hash: 'dcd7fc21b4a656326ec3413665f26aaf',
      authentication_token_expiry: 1658403483,
      properties: {
        email_id: 'test.user@1mg.com',
        tcp_number: '6000006627016102',
        visitor_id: '5a4333-784d-42d1-a6d8-885b86cf99eb_cadsadsad',
        name: 'Test User',
        tata_customer_hash: 'dcd73c21b4a656d76ec34136sadsa',
        contact_number: '99993223293',
        tcp_registration_date: '2022-02-09 14:16:11',
        is_loyal_customer: 'False',
      },
      username: 'random-test-username-hash',
      number_verified: true,
    };
    expect(
      usersReducer(initialState, onGetUserInfo(successUserInfo))
    ).toHaveProperty('loading', false);

    expect(
      usersReducer(initialState, onGetUserInfo(successUserInfo))
    ).toMatchObject({
      userInfo: {
        roles: {
          WALLET_APP: ['WALLET_ADMIN'],
          LARA_APP: ['LARA_ADMIN'],
          vmg_app: ['ROLE_ADMIN'],
          dmg_app: ['ROLE_ADMIN'],
          '1mg': ['ROLE_USER'],
        },
      },
    });

    expect(
      usersReducer(initialState, onGetUserInfo(successUserInfo))
    ).toHaveProperty('userEmail', 'test.user@1mg.com');
  });

  test('should check for blockedStatus when a successful search takes place', () => {
    const successUserInfo = {
      last_login: 1650623102,
      email_verified: true,
      is_guest: false,
      roles: {
        WALLET_APP: ['WALLET_ADMIN'],
        LARA_APP: ['LARA_ADMIN'],
        vmg_app: ['ROLE_ADMIN'],
        dmg_app: ['ROLE_ADMIN'],
        '1mg': ['ROLE_USER'],
      },
      email: 'test.user@1mg.com',
      is_migrated: false,
      external_id: '',
      created_on: 1644983443,
      authentication_token: '99f3089d-c58e-4474-b1d7-e6b3503123f009',
      suspended_on: null,
      number: '99993223293',
      verified: true,
      suspended: false,
      corporate_client: '1mg',
      updated_on: 1650630866,
      tata_customer_hash: 'dcd7fc21b4a656326ec3413665f26aaf',
      authentication_token_expiry: 1658403483,
      properties: {
        email_id: 'test.user@1mg.com',
        tcp_number: '6000006627016102',
        visitor_id: '5a4333-784d-42d1-a6d8-885b86cf99eb_cadsadsad',
        name: 'Test User',
        tata_customer_hash: 'dcd73c21b4a656d76ec34136sadsa',
        contact_number: '99993223293',
        tcp_registration_date: '2022-02-09 14:16:11',
        is_loyal_customer: 'False',
      },
      username: 'random-test-username-hash',
      number_verified: true,
    };

    expect(
      usersReducer(initialState, onGetUserInfo(successUserInfo))
    ).toHaveProperty('isBlocked', false);

    expect(
      usersReducer(initialState, onGetUserInfo(successUserInfo))
    ).toHaveProperty('blockedStatus', 'Deactivate');
  });

  test('should check for error while trying to fetch user', () => {
    const customError = 'Not Authorized, Please login again';
    expect(usersReducer(initialState, onGetError(customError))).toHaveProperty(
      'managementError',
      customError
    );
  });

  test('should remove all errors from the store', () => {
    expect(usersReducer(initialState, onRemoveErrors())).toHaveProperty(
      'managementError',
      ''
    );

    expect(usersReducer(initialState, onRemoveErrors())).toHaveProperty(
      'successMessage',
      ''
    );
  });

  test('should test BLOCK actions on store', () => {
    expect(
      usersReducer(
        initialState,
        onBlockUnBlock(true, 'Activate', 'User suspended successfully.')
      )
    ).toHaveProperty('blockedStatus', 'Activate');

    expect(
      usersReducer(
        initialState,
        onBlockUnBlock(true, 'Activate', 'User suspended successfully.')
      )
    ).toHaveProperty('successMessage', 'User suspended successfully.');
  });

  test('should test UNBLOCK actions on store', () => {
    expect(
      usersReducer(
        initialState,
        onBlockUnBlock(false, 'Deactivate', 'User restored successfully.')
      )
    ).toHaveProperty('blockedStatus', 'Deactivate');

    expect(
      usersReducer(
        initialState,
        onBlockUnBlock(false, 'Deactivate', 'User restored successfully.')
      )
    ).toHaveProperty('successMessage', 'User restored successfully.');
  });

  test('test to show successMessage when action is dispatched', () => {
    const fakeSuccessMessage = 'Fake Sucess Message';
    expect(
      usersReducer(initialState, onShowSuccessMessage(fakeSuccessMessage))
    ).toHaveProperty('successMessage', fakeSuccessMessage);
  });

  test('should update userInfo object when save users gets dispatched', () => {
    const successUserInfo = {
      last_login: 1650623102,
      email_verified: true,
      is_guest: false,
      roles: {
        WALLET_APP: ['WALLET_ADMIN'],
        LARA_APP: ['LARA_ADMIN'],
        vmg_app: ['ROLE_ADMIN'],
        dmg_app: ['ROLE_ADMIN'],
        '1mg': ['ROLE_USER'],
      },
      email: 'test.user@1mg.com',
      is_migrated: false,
      external_id: '',
      created_on: 1644983443,
      authentication_token: '99f3089d-c58e-4474-b1d7-e6b3503123f009',
      suspended_on: null,
      number: '99993223293',
      verified: true,
      suspended: false,
      corporate_client: '1mg',
      updated_on: 1650630866,
      tata_customer_hash: 'dcd7fc21b4a656326ec3413665f26aaf',
      authentication_token_expiry: 1658403483,
      properties: {
        email_id: 'test.user@1mg.com',
        tcp_number: '6000006627016102',
        visitor_id: '5a4333-784d-42d1-a6d8-885b86cf99eb_cadsadsad',
        name: 'Test User',
        tata_customer_hash: 'dcd73c21b4a656d76ec34136sadsa',
        contact_number: '99993223293',
        tcp_registration_date: '2022-02-09 14:16:11',
        is_loyal_customer: 'False',
      },
      username: 'random-test-username-hash',
      number_verified: true,
    };
    expect(
      usersReducer(initialState, changeUserDetails(successUserInfo))
    ).toMatchObject({
      userInfo: successUserInfo,
    });
  });
});
