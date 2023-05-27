import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './examples/App';
import { DynamicEvents } from './lib/constants';
import { configureAnalytics } from './lib/service/registrationService';
import { DynamicsConfiguration } from './lib';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

const configuration: DynamicsConfiguration = {
  applicationName: 'SampleApplication1',
  captureEvents: [DynamicEvents.MOUNT, DynamicEvents.ERROR, DynamicEvents.MOUSECLICK, DynamicEvents.MOUSEOVER],
  apiUrl: 'https://google/com',
  devConsole: true,
  captureAnonymizedId: true
}

configureAnalytics(configuration);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);