import { combineReducers } from 'redux';

import googleReducer from './auth.reducer';
import usersReducer from './users.reducer';

const rootReducer = combineReducers({
  user: googleReducer,
  muser: usersReducer,
});

export default rootReducer;
