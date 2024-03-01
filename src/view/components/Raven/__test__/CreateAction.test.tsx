import React from 'react';
import { withProvider } from '../../../../common/renderWithProvider';
import '@testing-library/jest-dom/extend-expect';
import { render, cleanup, screen, fireEvent } from '@testing-library/react';
import CreateAction from '../CreateAction';
import userEvent from '@testing-library/user-event';
import * as redux from 'react-redux';
import { ticketPriorityObjects, accessToken } from './mock';

jest.mock('src/store/actions/ravenNodeEvents');

describe('Create Action Test-Suite', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  afterEach(cleanup);
  test('Match Create Node Action Snapshot', async () => {
    jest
      .spyOn(redux, 'useSelector')
      .mockImplementationOnce(() => ticketPriorityObjects)
      .mockImplementationOnce(() => accessToken)
      .mockImplementationOnce(() => false);
    const { asFragment } = render(withProvider(<CreateAction />));
    expect(asFragment()).toMatchSnapshot();
  });

  test('Showcase Mock Data', async () => {
    jest
      .spyOn(redux, 'useSelector')
      .mockImplementationOnce(() => ticketPriorityObjects)
      .mockImplementationOnce(() => accessToken)
      .mockImplementationOnce(() => false);

    render(withProvider(<CreateAction />));
  });

  test('React Internationalization - Should Work As Expected', () => {
    const component = render(withProvider(<CreateAction />));
    expect(component.container).toHaveTextContent('Create Node Action Form');
  });

  test('Header Name input should be clickable and editable and showcase error accordingly', async () => {
    const component = render(withProvider(<CreateAction />));
    const HeaderNameInput = screen.getByPlaceholderText(
      'Header Name'
    ) as HTMLInputElement;
    await userEvent.type(HeaderNameInput, 'Create Node Action');
    expect(HeaderNameInput).toHaveValue('Create Node Action');
    await userEvent.clear(HeaderNameInput);
    expect(HeaderNameInput).toHaveValue('');

    // Type Special characters and numbers to showcase errors
    await userEvent.type(HeaderNameInput, '23232');
    expect(component.container).toHaveTextContent(
      'Create Node Action FormNode Action Header:No of Characters :5Type Details:Ticket Priority:None PriorityOptional Fields:Required Fields:Screen Text:Response Text:<b>Thank You!</b><br>We have received your message and will be in touch over your registered email id as soon as possible.No of Characters : 122Preview'
    );
  });

  test('Create Node Action Form Screen Text Area', () => {
    render(withProvider(<CreateAction />));
    const input = screen.getByPlaceholderText(
      '<b>Thank you!</b><br>We have received your message and will be in touch over your registered email id as soon as possible.'
    );
    fireEvent.change(input, { target: { value: '23' } });
  });

  test('Create Node Action Form Response Text Area', () => {
    render(withProvider(<CreateAction />));
    const input = screen.getByDisplayValue(
      '<b>Thank You!</b><br>We have received your message and will be in touch over your registered email id as soon as possible.'
    );
    fireEvent.change(input, {
      target: {
        value:
          '<b>Thank You!</b><br>We have received your message and will be in touch over your registered email id as soon as possible.',
      },
    });
  });
});
