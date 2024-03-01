import React from 'react';
import { render } from '@testing-library/react';
import * as routeData from 'react-router';

import { store, withProvider } from 'src/common/renderWithProvider';
import { fetchSmsEvents } from 'src/store/actions/smsEvents';
import { fetchallEmailEvents } from 'src/store/actions/emailEvents';
import { fetchWhatsAppEvents } from 'src/store/actions/whatsappEvents';
import { fetchPushNotificationEvents } from 'src/store/actions/pushNotificationEvents';

import CommunicationList from './CommunicationList';

jest.mock('src/store/actions/smsEvents');
jest.mock('src/store/actions/emailEvents');
jest.mock('src/store/actions/whatsappEvents');
jest.mock('src/store/actions/pushNotificationEvents');

describe('CommunicationList', () => {
  test('should display CommunicationList screen', async () => {
    const { asFragment } = render(withProvider(<CommunicationList />));
    expect(asFragment()).toMatchSnapshot();
  });

  test('should fetch sms events when searchBy in location.state is SMS ', async () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue({
      state: {
        searchBy: 'SMS',
      },
      key: '',
      pathname: '',
      search: '',
      hash: '',
    });

    render(withProvider(<CommunicationList />));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(fetchSmsEvents('', 10, 0));
  });

  test('should fetch email events when searchBy in location.state is Email ', async () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue({
      state: {
        searchBy: 'Email',
      },
      key: '',
      pathname: '',
      search: '',
      hash: '',
    });

    render(withProvider(<CommunicationList />));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(fetchallEmailEvents('', 10, 0));
  });

  test('should fetch whatsapp events when searchBy in location.state is Whatsapp ', async () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue({
      state: {
        searchBy: 'Whatsapp',
      },
      key: '',
      pathname: '',
      search: '',
      hash: '',
    });

    render(withProvider(<CommunicationList />));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(fetchWhatsAppEvents('', 10, 0));
  });

  test('should fetch pushNotification events when searchBy in location.state is Transactional Push Notification', async () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue({
      state: {
        searchBy: 'Transactional Push Notification',
      },
      key: '',
      pathname: '',
      search: '',
      hash: '',
    });

    render(withProvider(<CommunicationList />));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      fetchPushNotificationEvents('', 10, 0)
    );
  });

  test('should update type and display loading if location.state is updated', async () => {
    jest.spyOn(routeData, 'useLocation').mockReturnValue({
      state: {
        searchBy: 'Transactional Push Notification',
      },
      key: '',
      pathname: '',
      search: '',
      hash: '',
    });

    const { asFragment, rerender } = render(
      withProvider(<CommunicationList />)
    );

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(
      fetchPushNotificationEvents('', 10, 0)
    );

    jest.spyOn(routeData, 'useLocation').mockReturnValue({
      state: {
        searchBy: 'SMS',
      },
      key: '',
      pathname: '',
      search: '',
      hash: '',
    });

    rerender(withProvider(<CommunicationList />));

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(store.dispatch).toHaveBeenCalledWith(fetchSmsEvents('', 10, 0));

    expect(asFragment()).toMatchSnapshot();
  });
});
