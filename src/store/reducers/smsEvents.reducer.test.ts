import {
  fetchSMSEventsFailure,
  fetchSMSEventsRequest,
  fetchSMSEventsSuccess,
  updateSMSEventFailure,
  updateSMSEventRequest,
  updateSMSEventSuccess,
} from '../actions/smsEvents';
import smsEventsReducer from './smsEvents.reducer';

describe('Sms Event Reducer Test Suite', () => {
  const initialState: ISMSEventState = {
    loading: false,
    error: '',
    sms_templates: [],
    success: false,
  };

  test('should return the initial state', () => {
    expect(smsEventsReducer(undefined, {})).toEqual(initialState);
  });

  test('should change loading when fetching resources', () => {
    expect(smsEventsReducer(initialState, fetchSMSEventsRequest())).toEqual({
      ...initialState,
      loading: true,
    });
  });

  test('should test for error while fetching resources', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      smsEventsReducer(initialState, fetchSMSEventsFailure(randomError))
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  test('should test for error while update sms resource', () => {
    const randomError = 'Some Random Fake Error';
    expect(
      smsEventsReducer(initialState, updateSMSEventFailure(randomError))
    ).toEqual({
      ...initialState,
      loading: false,
      error: randomError,
    });
  });

  test('should test for resources when data fetching is succesful', () => {
    const randomData = {
      sms_templates: [
        {
          actions: 1,
          event_name: 'payment_failed_appointment',
          app_name: 'Doctors',
          triggers_limit: -1,
          event_text:
            'Dear {{patient}},\nYour payment request for Consult ID: {{conversation_id}} has failed.\nIn case the payment has been deducted, the amount will be deposited in your account within 3-4 working days.\nClick here to complete your payment and confirm your appointment: {{order_summary_url}}\nThanks -Tata 1mg',
          id: 531,
        },
        {
          actions: 1,
          event_name: 'doc_appointment_booked',
          app_name: 'Doctors',
          triggers_limit: -1,
          event_text:
            'Hello {{doctor_name}}, \n {{patient}} has booked an appointment ({{conversation_id}}) with you on {{date}}, {{time}}. \nThanks. -Tata 1mg',
          id: 529,
        },
      ],
    };

    expect(
      smsEventsReducer(initialState, fetchSMSEventsSuccess(randomData))
    ).toEqual({
      ...initialState,
      sms_templates: randomData.sms_templates,
    });
  });

  test('should return same state while sending update request', () => {
    expect(smsEventsReducer(initialState, updateSMSEventRequest())).toEqual(
      initialState
    );
  });

  test('should return success message when sms updation successful', () => {
    expect(smsEventsReducer(initialState, updateSMSEventSuccess(true))).toEqual(
      {
        ...initialState,
        success: true,
      }
    );
  });
});
