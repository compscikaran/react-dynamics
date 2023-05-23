import { DynamicEvents } from "./constants";
import Telemetry from "./service/Telemetry";
import { saveEmeraldTelemetry } from "./service/telemetryService";

const dynamicsMiddleware = store => next => action => {
    const actionType = action.type;
    const url = JSON.stringify(action.payload);
    const telemetry = new Telemetry(actionType, DynamicEvents.REDUX_ACTION, url);
    saveEmeraldTelemetry(telemetry);
    next(action);
}

export default dynamicsMiddleware;