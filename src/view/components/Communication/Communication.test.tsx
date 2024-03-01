import React from 'react';
import { render, screen } from '@testing-library/react';
import * as routeData from 'react-router';

import {
  mockSmsEventDetails,
  mockEmailEventDetails,
  mockPushNotificationEventDetails,
  mockWhatsappEventDetails,
  withProvider,
} from 'src/common/renderWithProvider';

import Communication from './Communication';

describe('Communication', () => {
  test('should display Communication screen', async () => {
    const { asFragment } = render(withProvider(<Communication />));
    expect(asFragment()).toMatchSnapshot();
  });

  test('should display sms event details when sms event is provided in location.state', async () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue({
      state: { record: mockSmsEventDetails },
      key: '',
      pathname: '',
      search: '',
      hash: '',
    });

    render(withProvider(<Communication />));

    const communicationTypeSelectOption = screen.getByText('SMS');

    expect(communicationTypeSelectOption).toBeInTheDocument();
  });

  test('should display email event details when email event is provided in location.state', async () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue({
      state: { record: mockEmailEventDetails },
      key: '',
      pathname: '',
      search: '',
      hash: '',
    });

    render(withProvider(<Communication />));

    const communicationTypeSelectOption = screen.getByText('Email');

    expect(communicationTypeSelectOption).toBeInTheDocument();
  });

  test('should display whatsapp event details when whatsapp event is provided in location.state', async () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue({
      state: { record: mockWhatsappEventDetails },
      key: '',
      pathname: '',
      search: '',
      hash: '',
    });

    render(withProvider(<Communication />));

    const communicationTypeSelectOption = screen.getByText('Whatsapp');

    expect(communicationTypeSelectOption).toBeInTheDocument();
  });

  test('should display pushNotification event details when pushNotification event is provided in location.state', async () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue({
      state: { record: mockPushNotificationEventDetails },
      key: '',
      pathname: '',
      search: '',
      hash: '',
    });

    render(withProvider(<Communication />));

    const communicationTypeSelectOption = screen.getByText(
      'Transactional Push Notification'
    );

    expect(communicationTypeSelectOption).toBeInTheDocument();
  });

  // test('should update sms event details when sms event is provided and setEventDetails is called', async () => {
  //   jest.spyOn(routeData, 'useLocation').mockReturnValue({
  //     state: { record: mockSmsEventDetails },
  //     key: '',
  //     pathname: '',
  //     search: '',
  //     hash: '',
  //   });

  //   render(withProvider(<Communication />));

  //   const communicationTypeSelectOption = screen.getByText('SMS');

  //   expect(communicationTypeSelectOption).toBeInTheDocument();
  // });
});
