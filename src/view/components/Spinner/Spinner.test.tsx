import React from 'react';
import { render } from '@testing-library/react';

import { withProvider } from '../renderWithProvider';

import Spinner from './Spinner';

describe('Spinner', () => {
  test('should display Spinner when loading is true', async () => {
    const loading = true;
    const { asFragment } = render(withProvider(<Spinner loading={loading} />));
    expect(asFragment()).toMatchSnapshot();
  });

  test('should display Spinner when loading is false', async () => {
    const loading = false;
    const { asFragment } = render(withProvider(<Spinner loading={loading} />));
    expect(asFragment()).toMatchSnapshot();
  });
});
