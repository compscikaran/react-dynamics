import { DynamicEvents } from "../lib/constants";
import { configureAnalytics } from "../lib/service/registrationService";

export const setupDynamics = () => {
    configureAnalytics({
        applicationName: 'SampleApplication1',
        captureEvents: [DynamicEvents.MOUNT, DynamicEvents.ERROR, DynamicEvents.MOUSECLICK],
        apiUrl: 'https://google/com',
        devConsole: false,
        captureAnonymizedId: true
      });
}