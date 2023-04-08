import { render } from '@testing-library/react';
import App from '../examples/App';
import { LOCAL_STORAGE_API_URL, LOCAL_STORAGE_APP_NAME } from '../lib/constants';
import { setupDynamics } from './common';

describe('Configuration works', () => {
    setupDynamics();
    render(<App/>);
    
    test('Application is set', () => {
        const appName = localStorage.getItem(LOCAL_STORAGE_APP_NAME);
        expect(appName).toBe('SampleApplication1');
    });

    test('API URL is set', () => {
      const apiURL = localStorage.getItem(LOCAL_STORAGE_API_URL);
      expect(apiURL).toBe('https://google/com');
      
    });

    test('Telemetry is available in Dev Console', () => {
      expect(window.printTelemetry).toBeUndefined();
    });
});