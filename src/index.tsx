import { getUseDispatchRedux } from 'core';
import ReactDOM from 'react-dom';
import { useDispatch } from 'react-redux';
import * as Sentry from '@sentry/react';
import { Integrations } from '@sentry/tracing';
import App from './App';
import reportWebVitals from './reportWebVitals';

getUseDispatchRedux(useDispatch);

Sentry.init({
  dsn: 'https://38631bb6ae08444fb66f81124cd524e5@o1103125.ingest.sentry.io/6129801',
  integrations: [new Integrations.BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
  environment: 'production',
});

ReactDOM.render(<App />, document.getElementById('root'));

reportWebVitals();
