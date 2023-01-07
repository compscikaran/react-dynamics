import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './examples/App';
import { EmeraldEvents } from './lib/constants';
import withEmerald from "./lib/EmeraldWrapper";
import { configureEmerald } from './lib/service/registrationService';

const root = ReactDOM.createRoot(document.getElementById('root'));

configureEmerald({
  applicationName: 'SampleApplication1',
  captureEvents: [EmeraldEvents.MOUNT, EmeraldEvents.ERROR],
  apiUrl: 'https://google/com',
  devConsole: true
});

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);