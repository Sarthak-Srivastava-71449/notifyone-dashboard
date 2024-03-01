import { RootState } from 'src/App';

/**
 * Utility function to For Loading
 * @param {RootState} state
 */
export const getLoading = (state: RootState) => {
  const loading = state?.ravenRootEventsReducer?.loading;
  return loading;
};

/**
 * Utility function to For Root Nodes
 * @param {RootState} state
 */
export const getRootNodes = (state: RootState) => {
  const rootNodes = state?.ravenRootEventsReducer?.rootNodes;
  return rootNodes;
};

/**
 * Utility function to For Add Node Success
 * @param {RootState} state
 */
export const getAddNodeSuccess = (state: RootState) => {
  const addNodeSuccess = state?.ravenRootEventsReducer?.addNodeSuccess;
  return addNodeSuccess;
};

/**
 * Utility function to For Change Action Success
 * @param {RootState} state
 */
export const getChangeActionSuccess = (state: RootState) => {
  const changeActionSuccess =
    state?.ravenRootEventsReducer?.changeActionSuccess;
  return changeActionSuccess;
};

/**
 * Utility function to For Toggle Update Success
 * @param {RootState} state
 */
export const getToggleUpdateSuccess = (state: RootState) => {
  const changeActionSuccess =
    state?.ravenRootEventsReducer?.toggleUpdateSuccess;
  return changeActionSuccess;
};
