import React from 'react';
import * as redux from 'react-redux';
import { render, screen } from '@testing-library/react';

import { withProvider } from '../../components/renderWithProvider';

import ROLES from '../../roles_mapping/roles';

import Authorize, { isAuthorize, withAuthorize } from './authorize';

describe('Authorize', () => {
  test('should display children if user have the PAYMENT_DOCTORS role assigned', async () => {
    jest.spyOn(redux, 'useSelector').mockImplementationOnce(() => ({
      PAYMENT_DOCTORS: [
        'PAYMENT_NB',
        'PAYMENT_GROUP',
        'PAYMENT_BO',
        'PAYMENT_WALLET',
        'PAYMENT_UPI',
        'PAYMENT_AGGREGATOR',
      ],
    }));

    render(
      withProvider(
        <Authorize roles={ROLES.DOCTORS}>{'I am developer'}</Authorize>
      )
    );

    const renderChildren = screen.getByText('I am developer');

    expect(renderChildren).toBeInTheDocument();
  });

  test('should display children if user have the PAYMENT_PHARMACY role assigned', async () => {
    jest.spyOn(redux, 'useSelector').mockImplementationOnce(() => ({
      PAYMENT_PHARMACY: [
        'PAYMENT_NB',
        'PAYMENT_GROUP',
        'PAYMENT_BO',
        'PAYMENT_WALLET',
        'PAYMENT_UPI',
        'PAYMENT_AGGREGATOR',
      ],
    }));

    render(
      withProvider(
        <Authorize roles={ROLES.PHARMACY}>{'I am developer'}</Authorize>
      )
    );

    const renderChildren = screen.getByText('I am developer');

    expect(renderChildren).toBeInTheDocument();
  });

  test('should not display children if user do not have the PAYMENT_DOCTORS role assigned', async () => {
    jest.spyOn(redux, 'useSelector').mockImplementationOnce(() => ({
      '1mg': ['ROLE_USER'],
      LARA_APP: ['LARA_ADMIN'],
      PAYMENT_DIAGNOSTICS: [
        'PAYMENT_NB',
        'PAYMENT_GROUP',
        'PAYMENT_BO',
        'PAYMENT_WALLET',
        'PAYMENT_UPI',
        'PAYMENT_AGGREGATOR',
      ],
      PAYMENT_LINK: ['SEND_PAYMENT_LINK'],
      PAYMENT_PHARMACY: [
        'PAYMENT_NB',
        'PAYMENT_GROUP',
        'PAYMENT_BO',
        'PAYMENT_WALLET',
        'PAYMENT_UPI',
        'PAYMENT_AGGREGATOR',
      ],
      PH_APP: [
        'PAYMENT_ADMIN',
        'USER_PROFILE',
        'USER_ADMIN',
        'PAYMENT_REFUND_VIEW',
        'PAYMENT_REFUND',
      ],
      WALLET_APP: ['WALLET_ADMIN'],
      dmg_app: ['ROLE_ADMIN'],
      push: ['ROLE_ADMIN'],
      vmg_app: ['ROLE_ADMIN'],
    }));

    render(
      withProvider(
        <Authorize roles={ROLES.DOCTORS}>{'I am developer'}</Authorize>
      )
    );

    expect(() => screen.getByText('I am developer')).toThrow();
  });
});

describe('isAuthorize', () => {
  test('should return true if user have the PAYMENT_DOCTORS role assigned', async () => {
    jest.spyOn(redux, 'useSelector').mockImplementationOnce(() => ({
      PAYMENT_DOCTORS: [
        'PAYMENT_NB',
        'PAYMENT_GROUP',
        'PAYMENT_BO',
        'PAYMENT_WALLET',
        'PAYMENT_UPI',
        'PAYMENT_AGGREGATOR',
      ],
    }));

    const result = isAuthorize(ROLES.DOCTORS);

    expect(result).toBe(true);
  });

  test('should return false if user do not have the PAYMENT_DOCTORS role assigned', async () => {
    jest.spyOn(redux, 'useSelector').mockImplementationOnce(() => ({
      '1mg': ['ROLE_USER'],
      LARA_APP: ['LARA_ADMIN'],
      PAYMENT_DIAGNOSTICS: [
        'PAYMENT_NB',
        'PAYMENT_GROUP',
        'PAYMENT_BO',
        'PAYMENT_WALLET',
        'PAYMENT_UPI',
        'PAYMENT_AGGREGATOR',
      ],
      PAYMENT_LINK: ['SEND_PAYMENT_LINK'],
      PAYMENT_PHARMACY: [
        'PAYMENT_NB',
        'PAYMENT_GROUP',
        'PAYMENT_BO',
        'PAYMENT_WALLET',
        'PAYMENT_UPI',
        'PAYMENT_AGGREGATOR',
      ],
      PH_APP: [
        'PAYMENT_ADMIN',
        'USER_PROFILE',
        'USER_ADMIN',
        'PAYMENT_REFUND_VIEW',
        'PAYMENT_REFUND',
      ],
      WALLET_APP: ['WALLET_ADMIN'],
      dmg_app: ['ROLE_ADMIN'],
      push: ['ROLE_ADMIN'],
      vmg_app: ['ROLE_ADMIN'],
    }));

    const result = isAuthorize(ROLES.DOCTORS);

    expect(result).toBe(false);
  });
});

describe('withAuthorize', () => {
  test('should display children if user have the PAYMENT_DOCTORS role assigned', async () => {
    jest.spyOn(redux, 'useSelector').mockImplementationOnce(() => ({
      '1mg': ['ROLE_USER'],
      LARA_APP: ['LARA_ADMIN'],
      PAYMENT_DIAGNOSTICS: [
        'PAYMENT_NB',
        'PAYMENT_GROUP',
        'PAYMENT_BO',
        'PAYMENT_WALLET',
        'PAYMENT_UPI',
        'PAYMENT_AGGREGATOR',
      ],
      PAYMENT_DOCTORS: [
        'PAYMENT_NB',
        'PAYMENT_GROUP',
        'PAYMENT_BO',
        'PAYMENT_WALLET',
        'PAYMENT_UPI',
        'PAYMENT_AGGREGATOR',
      ],
      PAYMENT_LINK: ['SEND_PAYMENT_LINK'],
      PAYMENT_PHARMACY: [
        'PAYMENT_NB',
        'PAYMENT_GROUP',
        'PAYMENT_BO',
        'PAYMENT_WALLET',
        'PAYMENT_UPI',
        'PAYMENT_AGGREGATOR',
      ],
      PH_APP: [
        'PAYMENT_ADMIN',
        'USER_PROFILE',
        'USER_ADMIN',
        'PAYMENT_REFUND_VIEW',
        'PAYMENT_REFUND',
      ],
      WALLET_APP: ['WALLET_ADMIN'],
      dmg_app: ['ROLE_ADMIN'],
      push: ['ROLE_ADMIN'],
      vmg_app: ['ROLE_ADMIN'],
    }));

    const Component = () => <div>{'I am developer'}</div>;

    render(
      withAuthorize(Component)({
        roles: ROLES.DOCTORS,
      })
    );

    const renderChildren = screen.getByText('I am developer');

    expect(renderChildren).toBeInTheDocument();
  });

  test('should display children if user have the PAYMENT_PHARMACY role assigned', async () => {
    jest.spyOn(redux, 'useSelector').mockImplementationOnce(() => ({
      PAYMENT_PHARMACY: [
        'PAYMENT_NB',
        'PAYMENT_GROUP',
        'PAYMENT_BO',
        'PAYMENT_WALLET',
        'PAYMENT_UPI',
        'PAYMENT_AGGREGATOR',
      ],
    }));

    const Component = () => <div>{'I am developer'}</div>;

    render(
      withAuthorize(Component)({
        roles: ROLES.PHARMACY,
      })
    );

    const renderChildren = screen.getByText('I am developer');

    expect(renderChildren).toBeInTheDocument();
  });

  test('should not display children if user do not have the PAYMENT_DOCTORS role assigned', async () => {
    jest.spyOn(redux, 'useSelector').mockImplementationOnce(() => ({
      '1mg': ['ROLE_USER'],
      LARA_APP: ['LARA_ADMIN'],
      PAYMENT_DIAGNOSTICS: [
        'PAYMENT_NB',
        'PAYMENT_GROUP',
        'PAYMENT_BO',
        'PAYMENT_WALLET',
        'PAYMENT_UPI',
        'PAYMENT_AGGREGATOR',
      ],
      PAYMENT_LINK: ['SEND_PAYMENT_LINK'],
      PAYMENT_PHARMACY: [
        'PAYMENT_NB',
        'PAYMENT_GROUP',
        'PAYMENT_BO',
        'PAYMENT_WALLET',
        'PAYMENT_UPI',
        'PAYMENT_AGGREGATOR',
      ],
      PH_APP: [
        'PAYMENT_ADMIN',
        'USER_PROFILE',
        'USER_ADMIN',
        'PAYMENT_REFUND_VIEW',
        'PAYMENT_REFUND',
      ],
      WALLET_APP: ['WALLET_ADMIN'],
      dmg_app: ['ROLE_ADMIN'],
      push: ['ROLE_ADMIN'],
      vmg_app: ['ROLE_ADMIN'],
    }));

    const Component = () => <div>{'I am developer'}</div>;

    render(
      withAuthorize(Component)({
        roles: ROLES.DOCTORS,
      })
    );

    expect(() => screen.getByText('I am developer')).toThrow();
  });
});
