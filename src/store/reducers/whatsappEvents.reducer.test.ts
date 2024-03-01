import {
  fetchWhatsAppEventsFailure,
  fetchWhatsAppEventsRequest,
  fetchWhatsAppEventsSuccess,
  updateWhatsAppEventsFailure,
  updateWhatsAppEventsRequest,
  updateWhatsAppEventsSuccess,
} from '../actions/whatsappEvents';
import whatsAppEventsReducer from './whatsappEvents.reducer';

describe('Whatsapp Event Reducer Test Suite', () => {
  const initialState: IWhatsappState = {
    loading: false,
    error: '',
    success: false,
    whatsapp_templates: [],
  };

  test('should return the initial state', () => {
    expect(whatsAppEventsReducer(undefined, {})).toEqual(initialState);
  });

  test('should change loading when fetching resources', () => {
    expect(
      whatsAppEventsReducer(initialState, fetchWhatsAppEventsRequest())
    ).toEqual({
      ...initialState,
      loading: true,
    });
  });

  test('should test for error while fetching resources', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      whatsAppEventsReducer(
        initialState,
        fetchWhatsAppEventsFailure(randomError)
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
      whatsAppEventsReducer(
        initialState,
        updateWhatsAppEventsFailure(randomError)
      )
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  test('should test for resources when data fetching is succesful', () => {
    const randomData = {
      whatsapp_templates: [
        {
          actions: 1,
          event_name: 'temp',
          app_name: 'diagnostics',
          triggers_limit: -1,
          event_text: 87,
          id: 445,
        },
        {
          actions: 1,
          event_name: 'feedback_sample_collected',
          app_name: 'diagnostics',
          triggers_limit: -1,
          event_text: 86,
          id: 440,
        },
      ],
    };

    expect(
      whatsAppEventsReducer(
        initialState,
        fetchWhatsAppEventsSuccess(randomData)
      )
    ).toEqual({
      ...initialState,
      whatsapp_templates: randomData.whatsapp_templates,
    });
  });

  test('should return same state while sending update request', () => {
    expect(
      whatsAppEventsReducer(initialState, updateWhatsAppEventsRequest())
    ).toEqual(initialState);
  });

  test('should return success message when whatsapp event updation successful', () => {
    expect(
      whatsAppEventsReducer(initialState, updateWhatsAppEventsSuccess(true))
    ).toEqual({
      ...initialState,
      success: true,
    });
  });
});
