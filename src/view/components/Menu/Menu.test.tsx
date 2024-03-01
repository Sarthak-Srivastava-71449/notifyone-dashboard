import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';

import { withProvider, MenuList } from '../renderWithProvider';

import Menu from './Menu';

describe('Menu', () => {
  test('should display Menu', async () => {
    const onMenuClick = jest.fn();
    const { asFragment } = render(
      withProvider(<Menu menuList={MenuList} onClick={onMenuClick} />)
    );
    expect(asFragment()).toMatchSnapshot();
  });

  test('should fire onClick on menu click', async () => {
    const onMenuClick = jest.fn();
    render(withProvider(<Menu menuList={MenuList} onClick={onMenuClick} />));

    const menu = screen.getByTestId('custom-menu');

    fireEvent.click(menu.firstChild as HTMLMenuElement);

    expect(onMenuClick).toBeCalledTimes(1);
  });
});
