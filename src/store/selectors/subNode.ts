import { RootState } from 'src/App';

/**
 * Utility function to For User Roles
 * @param {RootState} state
 */
export const getUserRoles = (state: RootState) => {
  const roles = state.user.roles;
  return roles;
};

/**
 * Utility function to For Inactive Nodes
 * @param {RootState} state
 */
export const getInactiveNodes = (state: RootState) => {
  const roles = state?.ravenRootEventsReducer?.inactiveNodes;
  return roles;
};
