import _ from "lodash";
import localforage from "localforage";

export const saveEmeraldTelemetry = (telemetry) => {
    const appName = localStorage.getItem('applicationName');
    if(appName == null) {
        throw new Error("Application not yet registered. Please refer docs");
    }
    const telemetryKey = appName + 'Telemetry';
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
    localforage.getItem('applicationName').then((appName) => {
        if(appName == null) {
            throw new Error("Application not yet registered. Please refer docs");
        }
        const telemetryKey = appName + 'Telemetry';
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