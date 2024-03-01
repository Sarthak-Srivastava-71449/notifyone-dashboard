import React from 'react';
import { render } from '@testing-library/react';

import { withProvider } from '../renderWithProvider';

import Table from './Table';

const columnsForTable = [
  {
    dataIndex: 'event_name',
    key: 'event_name',
    title: 'Event Name',
    sorter: (record_1: any, record_2: any) =>
      record_1.event_name.localeCompare(record_2.event_name),
  },
  {
    dataIndex: 'event_text',
    key: 'event_text',
    title: 'Event Text',
  },
  {
    dataIndex: 'app_name',
    key: 'app_name',
    title: 'Application Name',
    sorter: (record_1: any, record_2: any) =>
      record_1.app_name.localeCompare(record_2.app_name),
  },
];

const data = [
  {
    app_name: 'Doctors',
    event_name: 'payment_failed_appointment',
    event_text:
      'Dear {{patient}},\nYour payment request for Consult ID: {{conversation_id}} has failed.\nIn case the payment has been deducted, the amount will be deposited in your account within 3-4 working days.\nClick here to complete your payment and confirm your appointment: {{order_summary_url}}\nThanks -Tata 1mg',
    key: 1,
  },
  {
    app_name: 'Doctors',
    event_name: 'doc_appointment_booked',
    event_text:
      'Hello {{doctor_name}}, \n {{patient}} has booked an appointment ({{conversation_id}}) with you on {{date}}, {{time}}. \nThanks. -Tata 1mg',
    key: 2,
  },
];

jest.mock('antd');

describe('Table', () => {
  test('should display Table', async () => {
    const { asFragment } = render(
      withProvider(
        <Table bordered={true} columns={columnsForTable} dataSource={data} />
      )
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
