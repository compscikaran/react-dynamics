import { useEffect } from "react";
import { isEventConfigured } from "./service/registrationService";
import { DynamicEvents } from "./constants";
import DynamicsTelemetry from "./service/DynamicsTelemetry";
import { saveEmeraldTelemetry } from "./service/telemetryService";
import { Location, useLocation } from "react-router-dom";

export const useEffectTelemetry = (componentName: string, location: Location) => {

    useEffect(() => {
        if (isEventConfigured(DynamicEvents.MOUNT)) {
            const mountTelemetry = new DynamicsTelemetry(componentName, DynamicEvents.MOUNT, location.pathname)
            saveEmeraldTelemetry(mountTelemetry)
        }
        return () => {
            const unmountTelemetry = new DynamicsTelemetry(componentName, DynamicEvents.UNMOUNT, location.pathname)
            saveEmeraldTelemetry(unmountTelemetry)
        }
    }, []);

}