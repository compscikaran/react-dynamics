import _ from "lodash";
import localforage from "localforage";
import { LOCAL_STORAGE_APP_NAME, TELEMETRY_KEY_SUFFIX } from "../constants";
import MD5 from "crypto-js/md5";
import Telemetry from "./DynamicsTelemetry";

export const saveEmeraldTelemetry = (telemetry: Telemetry) => {
    const appName = localStorage.getItem(LOCAL_STORAGE_APP_NAME);
    if(appName == null) {
        throw new Error("Application not yet registered. Please refer docs");
    }
    const elementId: string = MD5(telemetry.toString()).toString();
    localforage.setItem(appName + elementId, telemetry);
}

export const retrieveTelemetry = async () => {
    const appName = localStorage.getItem(LOCAL_STORAGE_APP_NAME) || '';
    const data: Telemetry[] = [];
    await localforage.iterate((value: Telemetry, key: string, iterationNumber: number) => {
        if(key.startsWith(appName)) {
            data.push(value);        
        }
    });
    return data;
}