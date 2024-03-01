import { COMMUNICATION_TYPE } from 'src/common/constants';
import { RootState } from '../index';

/**
 * Utility function to map every whatsapp Event
 * @param  {RootState} state
 */
export const getWhatsAppEvents = (state: RootState) => {
  const whatsAppEvents = state?.whatsAppEvents?.whatsapp_templates;
  return (
    whatsAppEvents?.map((template: MWhatsappTemplate) => ({
      ...template,
      event_type: COMMUNICATION_TYPE.Whatsapp,
    })) || []
  );
};
