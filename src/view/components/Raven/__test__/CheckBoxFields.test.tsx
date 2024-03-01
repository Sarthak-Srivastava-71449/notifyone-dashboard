import React from 'react';
import { withProvider } from '../../../../common/renderWithProvider';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup } from '@testing-library/react';
import CheckBoxFields from '../CheckBoxFields';

jest.mock('src/store/actions/ravenNodeEvents');

describe('Check-Box-Fields Test-Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(cleanup);
  test('Match Check Box Field Snapshot', async () => {
    const { asFragment } = render(
      withProvider(
        <CheckBoxFields
          changeFunction={''}
          name={''}
          id={''}
          fields={''}
          checkedField={''}
          disabledField={''}
          isFieldChecked={false}
          skusCheck={false}
        />
      )
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('renders the landing page', () => {
    render(
      withProvider(
        <CheckBoxFields
          changeFunction={''}
          name={''}
          id={''}
          fields={''}
          checkedField={[]}
          disabledField={[]}
          isFieldChecked={false}
          skusCheck={false}
        />
      )
    );
  });
});
