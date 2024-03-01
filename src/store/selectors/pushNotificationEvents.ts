import { COMMUNICATION_TYPE } from 'src/common/constants';
import { RootState } from '../index';

/**
 * Utility function to map every push notification Event
 * @param  {RootState} state
 */
export const getPushNotificationEvents = (state: RootState) => {
  const pushNotificationEvents =
    state.pushNotificationEvents.push_notifications;
  return (
    pushNotificationEvents?.map((template: MPushEventTemplate) => ({
      ...template,
      event_type: COMMUNICATION_TYPE.Transactional_Push_notification,
    })) || []
  );
};
