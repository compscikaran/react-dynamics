import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './examples/App';
import { EmeraldEvents } from './lib/constants';
import withEmerald from "./lib/EmeraldWrapper";
import { registerEmerald, configureEmeraldEvents, configureEmeraldWorker } from './lib/service/registrationService';

const root = ReactDOM.createRoot(document.getElementById('root'));
registerEmerald('SampleApplication1');
configureEmeraldEvents([EmeraldEvents.MOUNT, EmeraldEvents.ERROR]);
configureEmeraldWorker('https://google/com');

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);