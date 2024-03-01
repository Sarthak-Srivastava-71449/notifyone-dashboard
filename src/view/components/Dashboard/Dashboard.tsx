import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { Menu } from '../Menu';
import { logoutUser } from 'src/platform/actions/auth';

import MenuList from 'src/common/appMenu/menu.json';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const location: any = useLocation();
  const onClickMenu = ({ key }: any) => {
    key === 'logout' && dispatch(logoutUser());
  };

  const getSelectedKey = () => {
    if (location.pathname.startsWith('/templates')) {
      const lastItem = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1
      );
      let key;
      switch (lastItem) {
        case '':
          key = 'search';
          break;
        case 'email':
          key = 'email';
          break;
        case 'sms':
          key = 'sms';
          break;
        case 'whatsapp':
          key = 'whatsapp';
          break;
        case 'transaction':
          key = 'transactional_push_notification';
          break;
        default:
          key = 'search';
      }
      return key;
    } else if (location.pathname.startsWith('/communication/raven')) {
      const lastItem = location.pathname.substring(
        location.pathname.lastIndexOf('/') + 1
      );
      const parts = location.pathname.split('/');
      const secondLastItem = parts[parts.length - 2];
      if (lastItem === 'raven') {
        return 'root_node';
      }
      if (secondLastItem === 'action') {
        return 'create_node_action';
      }
      if (secondLastItem === 'node') {
        return 'create_node';
      }
    }

    return '';
  };

  return (
    <div>
      <Menu
        className="!bg-app-theme communication-top-menu"
        data-testid="communication-top-menu"
        menuList={MenuList}
        mode="horizontal"
        onClick={onClickMenu}
        selectedKeys={[getSelectedKey()]}
        textTheme={'!text-white hover:!text-app-theme'}
        theme="dark"
      />
      <Outlet />
    </div>
  );
};

export const DashboardComponent = Dashboard;

export default Dashboard;
