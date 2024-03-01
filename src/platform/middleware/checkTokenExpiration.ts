import jwtDecode from 'jwt-decode';
import { AnyAction, Store } from 'redux';
import { LOGOUT_USER } from '../constants/index';

export const checkTokenExpirationMiddleware: any =
  (store: Store) => (next: any) => (action: AnyAction) => {
    const userObj = store.getState().user;
    if (userObj.success) {
      // Check if a user is logged in or not ?
      const jwtToken = userObj.tokens.accessToken;
      const decoded = jwtDecode(jwtToken) as any;
      if (decoded.exp < Date.now() / 1000) {
        next(action);
        store.dispatch({ type: LOGOUT_USER });
      }
    }
    next(action);
  };
