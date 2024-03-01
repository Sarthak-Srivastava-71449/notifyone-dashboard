import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import {
  mockEmailEventDetails,
  mockPushNotificationEventDetails,
  mockSmsEventDetails,
  mockWhatsappEventDetails,
  withProvider,
  store,
} from 'src/common/renderWithProvider';

import { updateSmsEvent } from 'src/store/actions/smsEvents';
import {
  previewEmailEvent,
  updateEmailEvent,
} from 'src/store/actions/emailEvents';
import { updatePushNotificationEvent } from 'src/store/actions/pushNotificationEvents';
import { updateWhatsAppEvent } from 'src/store/actions/whatsappEvents';

import CommunicationTemplate from './CommunicationTemplate';

jest.mock('src/store/actions/smsEvents');
jest.mock('src/store/actions/emailEvents');
jest.mock('src/store/actions/pushNotificationEvents');
jest.mock('src/store/actions/whatsappEvents');

const navigateMock = jest.fn();

jest.mock('react-router-dom', () => ({
  ...(jest.requireActual('react-router-dom') as any),
  useNavigate: () => navigateMock,
}));

describe('CommunicationTemplate', () => {
  test('should display new CommunicationTemplate screen with empty details', async () => {
    const eventDetails = {
      actions: '',
      app_name: '',
      event_name: '',
      event_type: '',
      id: '',
      triggers_limit: '',
    };
    const setEventDetails = jest.fn();

    const { asFragment } = render(
      withProvider(
        <CommunicationTemplate
          eventDetails={eventDetails}
          setEventDetails={setEventDetails}
          shouldDisable={false}
        />
      )
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should display sms event when sms event details are provided', async () => {
    const setEventDetails = jest.fn();

    const { asFragment } = render(
      withProvider(
        <CommunicationTemplate
          eventDetails={mockSmsEventDetails}
          setEventDetails={setEventDetails}
          shouldDisable={false}
        />
      )
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should display email event when email event details are provided', async () => {
    const setEventDetails = jest.fn();

    const { asFragment } = render(
      withProvider(
        <CommunicationTemplate
          eventDetails={mockEmailEventDetails}
          setEventDetails={setEventDetails}
          shouldDisable={false}
        />
      )
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should display pushNotification event when pushNotification event details are provided', async () => {
    const setEventDetails = jest.fn();

    const { asFragment } = render(
      withProvider(
        <CommunicationTemplate
          eventDetails={mockPushNotificationEventDetails}
          setEventDetails={setEventDetails}
          shouldDisable={false}
        />
      )
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should display whatsapp event when whatsapp event details are provided', async () => {
    const setEventDetails = jest.fn();

    const { asFragment } = render(
      withProvider(
        <CommunicationTemplate
          eventDetails={mockWhatsappEventDetails}
          setEventDetails={setEventDetails}
          shouldDisable={false}
        />
      )
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should preview sms event when event type is SMS', async () => {
    const setEventDetails = jest.fn();

    render(
      withProvider(
        <CommunicationTemplate
          eventDetails={mockSmsEventDetails}
          setEventDetails={setEventDetails}
          shouldDisable={false}
        />
      )
    );

    const previewEventDetailsButton = screen.getByTestId(
      'preview-event-button'
    );

    fireEvent.click(previewEventDetailsButton);

    expect(store.dispatch).toHaveBeenCalledTimes(0);
  });

  test('should preview email event when event type is Email', async () => {
    const setEventDetails = jest.fn();

    render(
      withProvider(
        <CommunicationTemplate
          eventDetails={mockEmailEventDetails}
          setEventDetails={setEventDetails}
          shouldDisable={false}
        />
      )
    );

    const previewEventDetailsButton = screen.getByTestId(
      'preview-event-button'
    );

    fireEvent.click(previewEventDetailsButton);

    expect(store.dispatch).toHaveBeenCalledTimes(2);
    expect(store.dispatch).toHaveBeenCalledWith(
      previewEmailEvent(mockEmailEventDetails, '')
    );
  });

  test('should not dispatch email preview action if event text is empty', async () => {
    const setEventDetails = jest.fn();

    render(
      withProvider(
        <CommunicationTemplate
          eventDetails={{
            actions: '',
            app_name: '',
            event_name: '',
            event_type: '',
            id: '',
            triggers_limit: '',
          }}
          setEventDetails={setEventDetails}
          shouldDisable={false}
        />
      )
    );

    const previewEventDetailsButton = screen.getByTestId(
      'preview-event-button'
    );

    fireEvent.click(previewEventDetailsButton);

    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
