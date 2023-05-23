import _ from "lodash";
import localforage from "localforage";
import { LOCAL_STORAGE_APP_NAME, TELEMETRY_KEY_SUFFIX } from "../constants";
import MD5 from "crypto-js/md5";

export const saveEmeraldTelemetry = (telemetry) => {
    const appName = localStorage.getItem(LOCAL_STORAGE_APP_NAME);
    if(appName == null) {
        throw new Error("Application not yet registered. Please refer docs");
    }
    const elementId = MD5(telemetry.toString()).toString();
    localforage.setItem(appName + elementId, telemetry);
}

export const retrieveTelemetry = async () => {
    const appName = localStorage.getItem(LOCAL_STORAGE_APP_NAME);
    const data = [];
    await localforage.iterate((value, key, iterationNumber) => {
        if(key.startsWith(appName)) {
            data.push(value);        
        }
    });
    return data;
}