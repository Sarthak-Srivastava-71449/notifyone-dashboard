import { COMMUNICATION_TYPE } from 'src/common/constants';
import { RootState } from '../index';

/**
 * Utility function to map every Email Event
 * @param  {RootState} state
 */
export const getEmailEvents = (state: RootState) => {
  const emailEvents = state?.emailEvents?.email_templates;
  return (
    emailEvents?.map((template: MEmailTemplate) => ({
      ...template,
      event_type: COMMUNICATION_TYPE.Email,
    })) || []
  );
};
