import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './examples/App';
import { DynamicEvents } from './lib/constants';
import { configureAnalytics } from './lib/service/registrationService';

const root = ReactDOM.createRoot(document.getElementById('root'));

configureAnalytics({
  applicationName: 'SampleApplication1',
  captureEvents: [DynamicEvents.MOUNT, DynamicEvents.ERROR, DynamicEvents.MOUSECLICK],
  apiUrl: 'https://google/com',
  devConsole: true
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);