import React from 'react';
import thunk from 'redux-thunk';
import {
  applyMiddleware,
  combineReducers,
  legacy_createStore as createStore,
} from 'redux';
import { composeWithDevTools } from '@redux-devtools/extension';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import { ToastContainer } from 'react-toastify';

import messages from '../i18n/messages';
import googleReducer from 'src/platform/reducers/auth.reducer';

import emailEventsReducer from 'src/store/reducers/emailEvents.reducer';
import pushNotificationEventsReducer from 'src/store/reducers/pushNotificationEvents.reducer';
import smsEventsReducer from 'src/store/reducers/smsEvents.reducer';
import whatsAppEventsReducer from 'src/store/reducers/whatsappEvents.reducer';

import Dashboard from 'src/view/components/Dashboard/Dashboard';
import CommunicationList from 'src/view/components/CommunicationList/CommunicationList';
import Communication from 'src/view/components/Communication/Communication';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

jest.mock('antd', () => {
  const antd = jest.requireActual('antd');

  return {
    ...antd,
  };
});

jest.mock('common/src/components/Spinner', () => ({
  Spinner: () => {
    return <></>;
  },
}));

let store: any;

const createTestStore = () => {
  const store = createStore(
    combineReducers({
      emailEvents: emailEventsReducer,
      pushNotificationEvents: pushNotificationEventsReducer,
      smsEvents: smsEventsReducer,
      whatsAppEvents: whatsAppEventsReducer,
      user: googleReducer,
    }),
    composeWithDevTools(applyMiddleware(thunk))
  );
  return store;
};

const withProvider = (component: any) => {
  store = createTestStore();
  store.dispatch = jest.fn();
  const locale = 'en-us';

  return (
    <Provider store={store}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <BrowserRouter>{component}</BrowserRouter>
      </IntlProvider>
    </Provider>
  );
};

const withLocationProvider = (to: string, state: any = {}) => {
  store = createTestStore();
  store.dispatch = jest.fn();
  const locale = 'en-us';

  window.history.pushState(state, '', to);

  return (
    <Provider store={store}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        <BrowserRouter>
          <ToastContainer />
          <Routes>
            <Route path="communication" element={<Dashboard />}>
              <Route path="templates" element={<CommunicationList />} />
              <Route path="template" element={<Communication />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </IntlProvider>
    </Provider>
  );
};

export { store, withLocationProvider };
export default withProvider;
