import * as Sentry from '@sentry/browser';
import { Integrations } from '@sentry/tracing';

export default () => {
  if (!!process.env.sentryDSN) {
    Sentry.init({
      dsn: process.env.sentryDSN,
      integrations: [new Integrations.BrowserTracing()],

      tracesSampleRate: 1.0,
    });
  }
};
