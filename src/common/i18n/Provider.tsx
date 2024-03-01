import React, { Fragment } from 'react';
import { IntlProvider } from 'react-intl';

import LOCALES from './locales';
import messages from './messages';

interface Props {
  children: JSX.Element;
  locale: string;
}

const Provider = ({ children, locale }: Props) => {
  return (
    <IntlProvider
      locale={locale}
      textComponent={Fragment}
      messages={messages[locale]}
    >
      {children}
    </IntlProvider>
  );
};

Provider.defaultProps = {
  locale: LOCALES.ENGLISH,
};

export default Provider;
