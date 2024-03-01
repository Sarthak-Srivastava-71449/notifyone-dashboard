import React from 'react';
import { render } from '@testing-library/react';

import { withProvider } from '../renderWithProvider';

import Unauthorized from './Unauthorized';

describe('Unauthorized', () => {
  test('should display Unauthorized screen', async () => {
    const { asFragment } = render(withProvider(<Unauthorized />));
    expect(asFragment()).toMatchSnapshot();
  });
});
