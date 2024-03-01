// Handle Permission Based on Role Passed
import PermissionConst from '../constants/permissions';
import rightConstants from '../constants/rightConstants';

const authPermissionHandler = (
  userRoles: object,
  appName: any,
  permission: rightConstants
): boolean => {
  function UPDATE(userRoles: any, appName: any): boolean {
    let status = false;
    if (userRoles[appName]) {
      userRoles[appName].forEach((value: string) => {
        if (PermissionConst.update.indexOf(appName + '::' + value) !== -1) {
          status = true;
        }
      });
    }
    return status;
  }
  function CREATE(userRoles: any, appName: any): boolean {
    let status = false;
    if (userRoles[appName]) {
      userRoles[appName].forEach((value: string) => {
        if (PermissionConst.update.indexOf(appName + '::' + value) !== -1) {
          status = true;
        }
      });
    }
    return status;
  }
  function READ(userRoles: any, appName: any): boolean {
    let status = false;
    if (userRoles[appName]) {
      userRoles[appName].forEach((value: string) => {
        if (PermissionConst.update.indexOf(appName + '::' + value) !== -1) {
          status = true;
        }
      });
    }
    return status;
  }
  function DELETE(userRoles: any, appName: any): boolean {
    let status = false;
    if (userRoles[appName]) {
      userRoles[appName].forEach((value: string) => {
        if (PermissionConst.update.indexOf(appName + '::' + value) !== -1) {
          status = true;
        }
      });
    }
    return status;
  }

  switch (permission) {
    case rightConstants.UPDATE:
      return UPDATE(userRoles, appName);
    case rightConstants.READ:
      return READ(userRoles, appName);
    case rightConstants.CREATE:
      return CREATE(userRoles, appName);
    case rightConstants.DELETE:
      return DELETE(userRoles, appName);
  }
};

export default authPermissionHandler;
