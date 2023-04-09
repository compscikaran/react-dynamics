import { render, fireEvent, screen } from '@testing-library/react';
import { DynamicEvents, LOCAL_STORAGE_API_URL, LOCAL_STORAGE_APP_NAME, LOCAL_STORAGE_UNIQ_ID } from '../lib/constants';
import { configureAnalytics } from '../lib/service/registrationService';
import { retrieveTelemetry } from '../lib/service/telemetryService';
import App from '../examples/App';
import { setupDynamics } from './common';

describe('Telemetry captures Hover event', () => {
    setupDynamics();
    render(<App/>);

    fireEvent.click(screen.getByText('location 1'));

    fireEvent.mouseOver(screen.getByText('This is Sample Component 1'));

    test('Hover event is captured', async () => {
        const data = await retrieveTelemetry();
        const hoverEventPresent = data.filter(x => x.event == DynamicEvents.MOUSEOVER);
        expect(hoverEventPresent.length).toBeGreaterThan(0);
    });
});