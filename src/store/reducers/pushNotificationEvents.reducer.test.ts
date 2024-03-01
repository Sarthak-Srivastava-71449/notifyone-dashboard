import {
  fetchPushNotificationEventsFailure,
  fetchPushNotificationEventsRequest,
  fetchPushNotificationEventsSuccess,
  updatePushNotificationEventsFailure,
  updatePushNotificationEventsRequest,
  updatePushNotificationEventsSuccess,
} from '../actions/pushNotificationEvents';
import pushNotificationEventsReducer from './pushNotificationEvents.reducer';

describe('Push Notification Event Reducer Test Suite', () => {
  const initialState: IPushEventState = {
    loading: false,
    error: '',
    push_notifications: [],
    success: false,
  };

  test('should return the initial state', () => {
    expect(pushNotificationEventsReducer(undefined, {})).toEqual(initialState);
  });

  test('should change loading when fetching resources', () => {
    expect(
      pushNotificationEventsReducer(
        initialState,
        fetchPushNotificationEventsRequest()
      )
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });

  test('should test for error while fetching resources', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      pushNotificationEventsReducer(
        initialState,
        fetchPushNotificationEventsFailure(randomError)
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  test('should test for error while update whatsapp resource', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      pushNotificationEventsReducer(
        initialState,
        updatePushNotificationEventsFailure(randomError)
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  test('should test for resources when data fetching is succesful', () => {
    const randomData = {
      push_notifications: [
        {
          body: '{{body}}',
          title: '{{title}}',
          image: null,
          updated_by: 'v-shubham.saxena@1mg.com',
          event_name: 'expired_mailer',
          app_name: 'offer_service',
          target: 'DYNAMIC TARGET',
          triggers_limit: -1,
          actions: 1,
          updated: 1645996295,
          id: 84,
        },
        {
          body: '{{body}}',
          title: '{{title}}',
          image: null,
          updated_by: 'lara_service_user',
          event_name: 'last_days_before_expiry',
          app_name: 'offer_service',
          target: 'DYNAMIC TARGET',
          triggers_limit: -1,
          actions: 1,
          updated: 1629096532,
          id: 83,
        },
      ],
    };

    expect(
      pushNotificationEventsReducer(
        initialState,
        fetchPushNotificationEventsSuccess(randomData)
      )
    ).toEqual({
      ...initialState,
      push_notifications: randomData.push_notifications,
    });
  });

  test('should return same state while sending update request', () => {
    expect(
      pushNotificationEventsReducer(
        initialState,
        updatePushNotificationEventsRequest()
      )
    ).toEqual(initialState);
  });

  test('should return success message when push notification event updation successful', () => {
    expect(
      pushNotificationEventsReducer(
        initialState,
        updatePushNotificationEventsSuccess(true)
      )
    ).toEqual({
      ...initialState,
      success: true,
    });
  });
});
