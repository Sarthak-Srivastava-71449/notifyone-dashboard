import { RootState } from 'src/App';

/**
 * Utility function to For Create Node Success
 * @param {RootState} state
 */
export const getCreateNodeSuccess = (state: RootState) => {
  const createNodeSuccess = state?.ravenRootEventsReducer?.createNodeSuccess;
  return createNodeSuccess;
};

/**
 * Utility function to For New Node Options
 * @param {RootState} state
 */
export const getNewNodeOptions = (state: RootState) => {
  const newNodeOptions = state?.ravenRootEventsReducer?.newNodeOptions;
  return newNodeOptions;
};

/**
 * Utility function to For Node Actions
 * @param {RootState} state
 */
export const getNodeActions = (state: RootState) => {
  const nodeActions = state?.ravenRootEventsReducer?.nodeActions;
  return nodeActions;
};
