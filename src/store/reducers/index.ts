import { combineReducers } from 'redux';

import emailEventsReducer from './emailEvents.reducer';
import pushNotificationEventsReducer from './pushNotificationEvents.reducer';
import smsEventsReducer from './smsEvents.reducer';
import whatsAppEventsReducer from './whatsappEvents.reducer';
import googleReducer from 'src/platform/reducers/auth.reducer';
import ravenRootEventsReducer from './ravenRootNodeEvents.reducer';
import currentEventsReducer from './currentEvent.reducer';

const rootReducer = combineReducers({
  emailEvents: emailEventsReducer,
  pushNotificationEvents: pushNotificationEventsReducer,
  smsEvents: smsEventsReducer,
  whatsAppEvents: whatsAppEventsReducer,
  currentEvent: currentEventsReducer,
  ravenRootEventsReducer: ravenRootEventsReducer,
  user: googleReducer,
});

export default rootReducer;
