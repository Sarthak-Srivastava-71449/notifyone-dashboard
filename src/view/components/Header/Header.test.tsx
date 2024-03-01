import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { withProvider } from 'src/common/renderWithProvider';

import Header from './Header';

describe('Header', () => {
  test('should display Header screen', async () => {
    const changeLocale = jest.fn();
    const locale = 'en-us';
    const name = 'shubham';

    const { asFragment } = render(
      withProvider(
        <Header changeLocale={changeLocale} locale={locale} name={name} />
      )
    );
    expect(asFragment()).toMatchSnapshot();
  });

  /**
   * Test if Header renders unified admin logo correctly
   */
  test('should display unified_admin_communication_logo', async () => {
    const changeLocale = jest.fn();
    const locale = 'en-us';
    const name = 'shubham';

    render(
      withProvider(
        <Header changeLocale={changeLocale} locale={locale} name={name} />
      )
    );

    const logo = screen.getByTestId('unified-admin-logo');
    expect(logo).toHaveAttribute('src', 'unified-admin-communication.svg');
    expect(logo).toHaveAttribute('alt', 'Unified Admin Communication Portal');
  });

  /**
   * Test if Header renders tata 1mg logo correctly
   */
  test('should display tata_1mg_logo', async () => {
    const changeLocale = jest.fn();
    const locale = 'en-us';
    const name = 'shubham';

    render(
      withProvider(
        <Header changeLocale={changeLocale} locale={locale} name={name} />
      )
    );

    const logo = screen.getByTestId('tata-1mg-logo');
    expect(logo).toHaveAttribute('src', 'logo.svg');
    expect(logo).toHaveAttribute('alt', 'Tata 1mg logo');
  });

  /*
   * Used for antd select, Currently in progress....
   */
  test('should update locale', async () => {
    const changeLocale = jest.fn();
    const locale = 'en-us';
    const name = 'shubham';

    render(
      withProvider(
        <Header changeLocale={changeLocale} locale={locale} name={name} />
      )
    );

    const selectLocales: HTMLSelectElement =
      screen.getByTestId('select-locales');

    expect(selectLocales).toBeInTheDocument();
    expect(changeLocale).toHaveBeenCalledTimes(0);

    const englishLocale = screen.getByText('en-us');

    fireEvent.mouseDown(englishLocale);

    const options: any = screen.getAllByTestId('select-locales-option');

    fireEvent.click(options[1]);
    fireEvent.mouseDown(options[1]);
    expect(changeLocale).toHaveBeenCalledWith('hi-in', {
      children: 'hi-in',
      'data-testid': 'select-locales-option',
      key: 'hi-in',
      value: 'hi-in',
    });
  });
});
