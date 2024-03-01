import { RootState } from 'src/App';

/**
 * Utility function to For Ticket Options Reducer
 * @param {RootState} state
 */
export const getTicketOption = (state: RootState) => {
  const ticketOption = state.ravenRootEventsReducer?.ticketOptions;
  return ticketOption;
};

/**
 * Utility function to For Raven MetaInfo Reducer
 * @param {RootState} state
 */
export const getRavenMetaInfo = (state: RootState) => {
  const metaInfo = state.ravenRootEventsReducer?.ravenMetaInfo;
  return metaInfo;
};

/**
 * Utility function to For Create Success Reducer
 * @param {RootState} state
 */
export const getCreateSuccess = (state: RootState) => {
  const createSuccess = state?.ravenRootEventsReducer?.createSuccess;
  return createSuccess;
};
