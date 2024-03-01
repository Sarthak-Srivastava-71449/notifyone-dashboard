import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { withProvider } from '../renderWithProvider';

import Button from './Button';

describe('Button', () => {
  test('should display Button', async () => {
    const { asFragment } = render(withProvider(<Button />));
    expect(asFragment()).toMatchSnapshot();
  });

  test('should fire onClick on button click event', async () => {
    const onClick = jest.fn();
    render(withProvider(<Button onClick={onClick} />));

    const button = screen.getByTestId('custom-button');

    fireEvent.click(button);

    expect(onClick).toBeCalledTimes(1);
  });
});
