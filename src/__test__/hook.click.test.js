import { render, fireEvent, screen } from '@testing-library/react';
import { DynamicEvents, LOCAL_STORAGE_API_URL, LOCAL_STORAGE_APP_NAME, LOCAL_STORAGE_UNIQ_ID } from '../lib/constants';
import { configureAnalytics } from '../lib/service/registrationService';
import { retrieveTelemetry } from '../lib/service/telemetryService';
import App from '../examples/App';
import { setupDynamics } from './common';

describe('Hook captures Click event', () => {
    setupDynamics();
    render(<App/>);

    fireEvent.click(screen.getByText('location 4'));

    fireEvent.click(screen.getByText('This is Sample Component 4'));

    test('Click event is captured', async () => {
        const data = await retrieveTelemetry();
        const mouseEventPresent = data.filter(x => x.event == DynamicEvents.MOUSECLICK);
        expect(mouseEventPresent.length).toBeGreaterThan(0);
    });
});