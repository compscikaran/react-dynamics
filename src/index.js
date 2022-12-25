import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import withEmerald from "./lib/EmeraldWrapper";
import registerEmerald from './lib/service/registrationService';

const root = ReactDOM.createRoot(document.getElementById('root'));
registerEmerald('SampleApplication1');
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);