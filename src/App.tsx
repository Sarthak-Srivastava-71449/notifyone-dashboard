import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useState, useEffect } from 'react';

import LOCALES from './common/i18n/locales';
import { I18nProvider } from './common/i18n';

import AppRoutes from 'src/routes/AppRoutes';

import store from 'src/store';
import initializeSentry from 'src/SentryConfig';

import './App.css';

initializeSentry();

export default function App() {
  const [locale, setLocale] = useState(LOCALES.ENGLISH);

  useEffect(() => {
    toast.configure({
      autoClose: 1000,
      draggable: false,
    });
  }, []);

  return (
    <Provider store={store}>
      <I18nProvider locale={locale}>
        <BrowserRouter>
          <React.StrictMode>
            <AppRoutes changeLocale={setLocale} locale={locale} />
            <ToastContainer closeButton={false} position="top-right" />
          </React.StrictMode>
        </BrowserRouter>
      </I18nProvider>
    </Provider>
  );
}

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
