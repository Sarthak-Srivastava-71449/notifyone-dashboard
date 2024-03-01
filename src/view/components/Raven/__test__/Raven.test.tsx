import React from 'react';
import { withProvider } from '../../../../common/renderWithProvider';
import '@testing-library/jest-dom/extend-expect';
import {
  render,
  cleanup,
  waitFor,
  getByTestId,
  fireEvent,
  screen,
} from '@testing-library/react';
import Raven from '../Raven';

jest.mock('src/store/actions/ravenNodeEvents');

describe('Raven Test-Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(cleanup);
  test('Match Raven Snapshot', async () => {
    const { asFragment } = render(withProvider(<Raven />));
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders the landing page', () => {
    render(withProvider(<Raven />));
  });
});
