import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { withProvider, store } from 'src/common/renderWithProvider';

import { logoutUser } from 'src/platform/actions/auth';

import Dashboard from './Dashboard';

jest.mock('platform/src/store/actions/auth');

describe('Dashboard', () => {
  test('should display Dashboard screen', async () => {
    const { asFragment } = render(withProvider(<Dashboard />));
    expect(asFragment()).toMatchSnapshot();
  });

  test('should display communication menu', async () => {
    render(withProvider(<Dashboard />));
    const menu = screen.getByTestId('communication-top-menu');

    expect(menu).toBeInTheDocument();
  });

  test('should logout user on click on logout menu option', async () => {
    render(withProvider(<Dashboard />));
    const logoutMenuItem = screen.getByText('Logout');

    fireEvent.click(logoutMenuItem as HTMLElement);
    // fireEvent.keyDown(logoutMenuItem as HTMLElement);

    expect(store.dispatch).toHaveBeenCalledWith(logoutUser());
  });
});
