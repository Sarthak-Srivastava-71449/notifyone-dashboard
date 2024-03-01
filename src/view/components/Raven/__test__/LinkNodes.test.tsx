import React from 'react';
import { withProvider } from '../../../../common/renderWithProvider';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import LinkedNodes from '../LinkedNodes';

jest.mock('src/store/actions/ravenNodeEvents');

describe('LinkNode Test-Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(cleanup);
  test('Match Link Node Snapshot', async () => {
    const { asFragment } = render(withProvider(<LinkedNodes nodes={[]} />));
    expect(asFragment()).toMatchSnapshot();
  });
});
