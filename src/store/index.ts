import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { checkTokenExpirationMiddleware } from '../platform/middleware/checkTokenExpiration';
import reducers from './reducers';

const accessToken: string = localStorage.getItem('accessToken') || '';
const success: any = localStorage.getItem('success') || false;
const persistedState =
  accessToken && accessToken != undefined
    ? {
        user: {
          success: success,
          tokens: {
            accessToken: accessToken,
          },
        },
      }
    : {};

const middlewares = [thunk, checkTokenExpirationMiddleware];
const devTools =
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(...middlewares)
    : composeWithDevTools(applyMiddleware(...middlewares));

const initializeStore = () => createStore(reducers, persistedState, devTools);

const store = initializeStore();

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
