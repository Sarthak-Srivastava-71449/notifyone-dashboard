import { RootState } from '../index';

/**
 * Utility function to check if events are being loaded or not
 * @param  {RootState} state
 */
export const isFetchingEvents = (state: RootState) => {
  const loadingSmsEvents = state.smsEvents.loading;
  const loadingEmailEvents = state.emailEvents.loading;
  const loadingNotificationEvents = state.pushNotificationEvents.loading;
  const loadingWhatsAppEvents = state.whatsAppEvents.loading;

  return {
    loadingSmsEvents,
    loadingEmailEvents,
    loadingNotificationEvents,
    loadingWhatsAppEvents,
  };
};
