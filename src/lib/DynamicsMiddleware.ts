import { MiddlewareAPI, Dispatch, AnyAction } from "redux";
import { DynamicEvents } from "./constants";
import DynamicsTelemetry from "./service/DynamicsTelemetry";
import { saveEmeraldTelemetry } from "./service/telemetryService";

const dynamicsMiddleware = (store: MiddlewareAPI<any>) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    const actionType = action.type;
    const url = JSON.stringify(action.payload);
    const telemetry = new DynamicsTelemetry(actionType, DynamicEvents.REDUX_ACTION, url);
    saveEmeraldTelemetry(telemetry);
    next(action);
}

export default dynamicsMiddleware;