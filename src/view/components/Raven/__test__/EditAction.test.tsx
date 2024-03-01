import React from 'react';
import { withProvider } from '../../../../common/renderWithProvider';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import EditAction from '../EditAction';

jest.mock('src/store/actions/ravenNodeEvents');

// Raven Edit Action Node Test Cases

describe('Raven Edit Action Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(cleanup);
  test('Match Edit Action Snapshot', async () => {
    const { asFragment } = render(withProvider(<EditAction />));
    expect(asFragment()).toMatchSnapshot();
  });

  // Raven Edit Acton Node InputBox Test Cases

  test('should edit `Enter Valid Edit Action Node Name` input when filling inputbox', () => {
    const component = render(withProvider(<EditAction />));
    const input: any = component.getByTestId('editNodeName');
    fireEvent.change(input, {
      target: { value: input },
    });
    expect(input.value).toBe('[object HTMLInputElement]');
    expect(screen.queryByTestId('editNodeName')).toBeInTheDocument();
  });

  test('should edit `Enter Valid Header Name` input when filling inputbox', () => {
    const component = render(withProvider(<EditAction />));
    const input: any = component.getByTestId('headerName');
    fireEvent.change(input, {
      target: { value: input },
    });
    expect(input.value).toBe('[object HTMLInputElement]');
    expect(screen.queryByTestId('headerName')).toBeInTheDocument();
  });
});
