import { COMMUNICATION_TYPE } from 'src/common/constants';
import { RootState } from '../index';

/**
 * Utility function to map every sms Event
 * @param  {RootState} state
 */
export const getSmsEvents = (state: RootState) => {
  const smsEvents = state?.smsEvents?.sms_templates;
  return (
    smsEvents?.map((template: MSMSTemplate) => ({
      ...template,
      event_type: COMMUNICATION_TYPE.SMS,
      key: template.event_name,
    })) || []
  );
};
