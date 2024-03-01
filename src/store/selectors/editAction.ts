import { RootState } from 'src/App';

/**
 * Utility function to For Edit Node Details Reducer
 * @param {RootState} state
 */
export const getEditNodeDetails = (state: RootState) => {
  const editNodeDetails = state?.ravenRootEventsReducer?.editNodeDetails;
  return editNodeDetails;
};

/**
 * Utility function to For Linked Node Details Reducer
 * @param {RootState} state
 */
export const getLinkedNodeDetails = (state: RootState) => {
  const linkedNodeDetails = state?.ravenRootEventsReducer?.linkedNodeDetails;
  return linkedNodeDetails;
};

/**
 * Utility function to For Update Success Reducer
 * @param {RootState} state
 */
export const getUpdateSuccess = (state: RootState) => {
  const updateSuccess = state?.ravenRootEventsReducer?.updateSuccess;
  return updateSuccess;
};
