import * as Sentry from '@sentry/react';
import { Integrations as TracingIntegrations } from '@sentry/tracing';

import AppConfig from 'src/common/appConfig';

const initializeSentry = () =>
  Sentry.init({
    dsn: AppConfig.sentry.dns,

    // This enables automatic instrumentation (highly recommended)
    integrations: [new TracingIntegrations.BrowserTracing()],

    // To set a uniform sample rate
    tracesSampleRate: 0.2,
  });

export default initializeSentry;
