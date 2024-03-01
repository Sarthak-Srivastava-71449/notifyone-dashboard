import React from 'react';
import { withProvider } from '../../../../common/renderWithProvider';
import '@testing-library/jest-dom/extend-expect';
import * as redux from 'react-redux';
import {
  render,
  cleanup,
  getByTestId,
  fireEvent,
  screen,
  waitFor,
} from '@testing-library/react';
import CreateNode from '../CreateNode';

import userEvent from '@testing-library/user-event';
import {
  accessToken,
  createNodeSuccess,
  newNodeOptions,
  nodeActions,
} from './mock';

jest.mock('src/store/actions/ravenActionNodeEvents');
jest.mock('src/store/actions/ravenNodeEvents');
jest.mock('src/store/actions/ravenRootNodeEvents');
// Raven Create Node  Test Cases

describe('Raven Create-Node-Test Suite', () => {
  jest.fn(() => Promise.resolve());
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(cleanup);
  test('Match Create Node Snapshot', async () => {
    jest
      .spyOn(redux, 'useSelector')
      .mockImplementationOnce(() => accessToken)
      .mockImplementationOnce(() => createNodeSuccess)
      .mockImplementationOnce(() => newNodeOptions)
      .mockImplementationOnce(() => nodeActions);
    const { asFragment } = render(withProvider(<CreateNode />));
    expect(asFragment()).toMatchSnapshot();
  });

  test('Showcase Mock Data', async () => {
    jest
      .spyOn(redux, 'useSelector')
      .mockImplementationOnce(() => accessToken)
      .mockImplementationOnce(() => createNodeSuccess)
      .mockImplementationOnce(() => newNodeOptions)
      .mockImplementationOnce(() => nodeActions);

    render(withProvider(<CreateNode />));
  });

  test('React Internationalization - Should Work As Expected', () => {
    const component = render(withProvider(<CreateNode />));
    expect(component.container).toHaveTextContent('Create Node Form');
  });

  it('with only node name', async () => {
    const { getByTestId } = render(withProvider(<CreateNode />));
    fireEvent.change(getByTestId('enter_node_name'), {
      target: { value: 'enter_node_name' },
    });
    fireEvent.click(getByTestId('node_Submit_button'));
  });

  test('Select should change dropdown', async () => {
    const component = render(withProvider(<CreateNode />));
    const selectNodeDropdown = component.getAllByRole('combobox')[0];
    await userEvent.click(selectNodeDropdown);
    await waitFor(() => screen.getAllByText('Node Action')[0]);
    fireEvent.click(screen.getAllByText('Node Action')[0]);
    await waitFor(() =>
      expect(component.container).toHaveTextContent('Node Action')
    );
  });

  test('Testing Select DropDown Functionality', async () => {
    jest
      .spyOn(redux, 'useSelector')
      .mockImplementationOnce(() => accessToken)
      .mockImplementationOnce(() => createNodeSuccess)
      .mockImplementationOnce(() => newNodeOptions)
      .mockImplementationOnce(() => nodeActions);
    const component = render(withProvider(<CreateNode />));
    const selectDropDown = component.getAllByRole('combobox');
    await userEvent.click(selectDropDown[0]);
    await waitFor(() => screen.getAllByText('Sub Question')[0]);
    fireEvent.click(screen.getAllByText('Sub Question')[0]);
  });
});
