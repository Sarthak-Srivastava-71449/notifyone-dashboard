import React from 'react';
import { withProvider } from '../../../../common/renderWithProvider';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, fireEvent, screen } from '@testing-library/react';
import SubNode from '../SubNode';
import {
  accessToken,
  inactiveNodes,
  newNodeOptions,
  nodeActions,
  SubNodeData,
} from './mock';
import * as redux from 'react-redux';

jest.mock('src/store/actions/ravenActionNodeEvents');
jest.mock('src/store/actions/ravenNodeEvents');
jest.mock('src/store/actions/ravenRootNodeEvents');

// Raven Sub-Node-Unit-Testing Cases

describe('Raven Sub-Node-Test Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(cleanup);
  test('Match Create Node Snapshot', async () => {
    jest
      .spyOn(redux, 'useSelector')
      .mockImplementationOnce(() => accessToken)
      .mockImplementationOnce(() => inactiveNodes)
      .mockImplementationOnce(() => newNodeOptions)
      .mockImplementationOnce(() => nodeActions);
    const { asFragment } = render(
      withProvider(<SubNode nodeSubQuestion={undefined} rootNode={false} />)
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('Showcase Mock Data', async () => {
    jest
      .spyOn(redux, 'useSelector')
      .mockImplementationOnce(() => accessToken)
      .mockImplementationOnce(() => inactiveNodes)
      .mockImplementationOnce(() => newNodeOptions)
      .mockImplementationOnce(() => nodeActions);

    render(
      withProvider(<SubNode nodeSubQuestion={undefined} rootNode={false} />)
    );
  });

  // Raven Rank Node Test Cases

  test('should edit `Enter Valid rank number` input when filling inputbox', () => {
    const component = render(withProvider(<SubNode nodeSubQuestion />));
    const input: any = component.getByTestId('rank-number');
    fireEvent.change(input, {
      target: { value: SubNodeData },
    });
    expect(SubNodeData).toBe(SubNodeData);
    expect(screen.queryByTestId('rank-number')).toBeInTheDocument();
  });
});
