// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs';
import {beforeErrorSendHandler, errorDenyURLs, setErrorHandlers} from "./error.config";

const SENTRY_DSN = process.env.SENTRY_DSN || process.env.NEXT_PUBLIC_SENTRY_DSN;
const SENTRY_ENVIRONMENT = process.env.SENTRY_ENVIRONMENT || process.env.NEXT_PUBLIC_SENTRY_ENVIRONMENT;

setErrorHandlers();

Sentry.init({
  dsn: SENTRY_DSN || 'https://2f0c3833417e4f97bfe531961fef39f8@o1070852.ingest.sentry.io/6068976',
  tracesSampleRate: 0.01,
  environment: 'stage',
  beforeSend: beforeErrorSendHandler,
  denyUrls: errorDenyURLs,
});
