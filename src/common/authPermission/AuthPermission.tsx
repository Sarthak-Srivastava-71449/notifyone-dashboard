import React from 'react';
import { Unauthorized } from 'components/Unauthorized';
import rightConstants from '../constants/rightConstants';
import authPermissionHandler from './authPermissions';

interface AuthPermissionProps {
  roles: object;
  appName: string;
  permission: rightConstants;
  children: object;
}

const AuthPermission: React.FC<AuthPermissionProps> = (
  props: AuthPermissionProps
) => {
  const { roles, appName, permission } = props;
  let value = false;
  value = authPermissionHandler(roles, appName, permission);
  return (
    <>
      {value && props.children}
      {!value && <Unauthorized />}
    </>
  );
};

export default AuthPermission;
