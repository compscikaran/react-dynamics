import _ from "lodash";
import localforage from "localforage";
import { LOCAL_STORAGE_APP_NAME, TELEMETRY_KEY_SUFFIX } from "../constants";

export const saveEmeraldTelemetry = (telemetry) => {
    const appName = localStorage.getItem(LOCAL_STORAGE_APP_NAME);
    if(appName == null) {
        throw new Error("Application not yet registered. Please refer docs");
    }
    const telemetryKey = appName + TELEMETRY_KEY_SUFFIX;
    localforage.getItem(telemetryKey).then((val) => {
        let newData;
        if(val == null) {
            newData = new Array();
        } else {
            newData = _.cloneDeep(val);
        }
        newData.push(telemetry);
        localforage.setItem(telemetryKey, newData);
    });    
}

const getTelemetry = () => {
    localforage.getItem(LOCAL_STORAGE_APP_NAME).then((appName) => {
        if(appName == null) {
            throw new Error("Application not yet registered. Please refer docs");
        }
        const telemetryKey = appName + TELEMETRY_KEY_SUFFIX;
        localforage.getItem(telemetryKey).then((val) => {
            console.log(val);
        });
    });
}

export const attachTelemetryToWindow = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        window.printTelemetry = getTelemetry;
    }
}