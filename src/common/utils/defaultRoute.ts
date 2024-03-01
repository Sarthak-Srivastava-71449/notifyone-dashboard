import ROLES from '../roles_mapping/roles';

export const findDefaultRoute = (userRoles: Array<any>): string => {
  if (communicationRoleAuthorize(userRoles, ROLES.COMMUNICATION_APP)) {
    return 'communication/templates';
  } else if (communicationRoleAuthorize(userRoles, ROLES.COMMUNICATION_RAVEN)) {
    return 'communication/raven';
  }
  return '';
};

//Used for authorizing multi roles
export const communicationRoleAuthorize = (userRoles: any, roles: string[]) => {
  //Get app name
  let couldShow = false;
  // eslint-disable-next-line no-prototype-builtins
  if (roles.length === 1 && userRoles.hasOwnProperty(roles[0])) {
    couldShow = true;
  } else {
    couldShow =
      userRoles[roles[0]] &&
      Array.isArray(userRoles[roles[0]]) &&
      userRoles[roles[0]].filter((role: string) => roles.includes(role))
        .length > 0
        ? true
        : false;
  }
  return couldShow;
};
