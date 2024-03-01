import React from 'react';
import { withProvider } from '../../../../common/renderWithProvider';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, screen } from '@testing-library/react';
import EditNode from '../EditNode';

jest.mock('src/store/actions/ravenNodeEvents');

describe('EditNode Test-Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(cleanup);
  test('Match Edit Node Snapshot', async () => {
    const { asFragment } = render(withProvider(<EditNode />));
    expect(asFragment()).toMatchSnapshot();
  });

  test('should span value matched to the document', () => {
    const component = render(withProvider(<EditNode />));
    component.getByTestId('data-name');
    expect(screen.queryByTestId('data-name')).toBeInTheDocument();
  });

  test('should text area value matched to the document', () => {
    const component = render(withProvider(<EditNode />));
    component.getByTestId('textArea');
    expect(screen.queryByTestId('textArea')).toBeInTheDocument();
  });
});
