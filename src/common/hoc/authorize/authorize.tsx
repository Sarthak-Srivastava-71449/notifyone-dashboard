/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-prototype-builtins */
import React, { ReactChild } from 'react';
import { useSelector } from 'react-redux';

import { Unauthorized } from 'src/view/components/Unauthorized';
import Roles from 'src/common/roles_mapping/roles';

interface UserRolesType {
  roles: string[];
  children?: any;
}

//Check if user has component role
export const withAuthorize = (
  WrappedComponent: any,
  userRoles: any,
  roles: any
) => {
  // function ComponentDecorated(props: UserRolesType) {
  // const userRoless = useSelector((state: any) => state?.user?.roles);

  // const couldShow = roles.reduce((roles: any, role: any) => {
  //   if (roles[role]) {
  //     return roles[role];
  //   }

  //   if (typeof roles === "string" && roles === role) {
  //     return true;
  //   }

  //   if (Array.isArray(roles) && roles?.includes(role)) {
  //     return true;
  //   }

  //   return false;
  // }, userRoles);

  // return couldShow ? <WrappedComponent /> : <Unauthorized />;
  // }

  // return ComponentDecorated;
  return <WrappedComponent />;
};

export const checkDeprecatedPageAccess = (userRoles: string[]) => {
  return userRoles && userRoles.includes(Roles.DEPRECATED_PAGE);
};

const Authorize = (props: UserRolesType, deprecated = false) => {
  const userRoles = useSelector((state: any) => state?.user?.roles);
  const { roles } = props;

  let couldShow = !!roles?.reduce((userRoles: any, role: any) => {
    if (userRoles[role]) {
      return userRoles[role];
    }

    if (typeof userRoles === 'string' && userRoles === role) {
      return true;
    }

    if (Array.isArray(userRoles) && userRoles?.includes(role)) {
      return true;
    }

    return false;
  }, userRoles);
  if (deprecated && couldShow) {
    couldShow = checkDeprecatedPageAccess(userRoles[roles[0]]);
  }

  return couldShow ? props.children : <Unauthorized />;
};

export const isAuthorizedCard = (
  roles: string[],
  userRoles: { [key: string]: string[] },
  component: ReactChild,
  deprecated = false
) => {
  let couldShow;
  if (roles && roles.length === 1 && userRoles.hasOwnProperty(roles[0])) {
    couldShow = true;
  } else {
    couldShow =
      userRoles[roles[0]] &&
      Array.isArray(userRoles[roles[0]]) &&
      userRoles[roles[0]].filter((role: string) => roles.includes(role))
        .length > 0;
  }
  if (deprecated && couldShow) {
    couldShow = checkDeprecatedPageAccess(userRoles[roles[0]]);
  }

  return couldShow ? component : <Unauthorized />;
};

export const isAuthorize = (roles: string[], deprecated = false) => {
  const userRoles = useSelector((state: any) => state?.user?.roles);
  let couldShow = !!roles?.reduce((userRoles: any, role: any) => {
    if (userRoles[role]) {
      return userRoles[role];
    }

    if (typeof userRoles === 'string' && userRoles === role) {
      return true;
    }

    if (Array.isArray(userRoles) && userRoles?.includes(role)) {
      return true;
    }

    return false;
  }, userRoles);
  if (deprecated && couldShow) {
    couldShow = checkDeprecatedPageAccess(userRoles[roles[0]]);
  }

  return couldShow;
};

//Used for authorizing multi roles
export const isAuthorizeMultiRoles = (roles: string[], deprecated = false) => {
  const userRoles = useSelector((state: any) => state?.user?.roles);
  //Get app name
  const roleListReqForPage = roles;
  if (!Array.isArray(roles)) return;

  //Extract roles for that app from all user roles
  const roleGivenToUserForApp = userRoles[roleListReqForPage[0]];

  let couldShow = false;
  !!roles.reduce((roles: any, role: any, i: any, arr: any) => {
    if (
      typeof roleGivenToUserForApp === 'string' &&
      roleGivenToUserForApp === role
    ) {
      couldShow = true;
      arr.length = 0; //used to break reduce
    }

    if (
      Array.isArray(roleGivenToUserForApp) &&
      roleGivenToUserForApp?.includes(role)
    ) {
      couldShow = true;
      arr.length = 0; //used to break reduce
    }
  }, userRoles);
  if (deprecated && couldShow) {
    couldShow = checkDeprecatedPageAccess(userRoles[roles[0]]);
  }

  return couldShow;
};

export default Authorize;
