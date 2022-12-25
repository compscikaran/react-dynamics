import _ from "lodash";
import localforage from "localforage";

export const saveEmeraldTelemetry = (telemetry) => {
    localforage.getItem('applicationName').then((appName) => {
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
    });
    
}

