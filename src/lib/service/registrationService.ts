import _ from "lodash";
import localforage, { config } from "localforage";
import MD5 from "crypto-js/md5";
import FingerprintJS, { GetResult }  from "@fingerprintjs/fingerprintjs";
import { LOCAL_STORAGE_API_URL, LOCAL_STORAGE_APP_NAME, LOCAL_STORAGE_TELEMETRY, LOCAL_STORAGE_UNIQ_ID } from "../constants";
import { retrieveTelemetry } from "./telemetryService";
import { DynamicsConfiguration } from "./DynamicsConfiguration";

// Master method for configuring various aspects of dynamics
export const configureAnalytics = (configs: DynamicsConfiguration) => {
    if(configs.applicationName) {
        registerApplication(configs.applicationName);
        registerServiceWorker();
    }
    if(configs.captureEvents) {
        configureEmeraldEvents(configs.captureEvents);
    }
    if(configs.apiUrl) {
        configureEmeraldWorker(configs.apiUrl);
    }
    if(configs.devConsole) {
        attachTelemetryToWindow();
    }
    if(configs.captureAnonymizedId) {
        recordFingerPrint();
    }
}

const registerApplication = (applicationName: string) => {
    if(!_.isEmpty(applicationName)) {
        localStorage.setItem(LOCAL_STORAGE_APP_NAME, applicationName);
        localforage.setItem(LOCAL_STORAGE_APP_NAME, applicationName);
    }
}

export const configureEmeraldEvents = (events: string[]) => {
    if(events.length > 0) {
        localStorage.setItem(LOCAL_STORAGE_TELEMETRY, events.join(';'));
    }
}

export const isEventConfigured = (emeraldEvent: string) => {
    const events = localStorage.getItem(LOCAL_STORAGE_TELEMETRY) || '';
    if(events.includes(emeraldEvent)) {
        return true;
    } else {
        return false;
    }
}

const registerServiceWorker = () => {
    if('serviceWorker' in navigator) {
        window.addEventListener('load', () => {
            navigator.serviceWorker
                .register('./dynamicsWorker.js')
                .then(reg => console.log('Service Worker registered'))
                .catch(error => console.log('Service worker failed: ' + error));
        });
    }
}

export const configureEmeraldWorker = (apiUrl: string) => {
    if(!_.isEmpty(apiUrl)) {
        localStorage.setItem(LOCAL_STORAGE_API_URL, apiUrl);
        localforage.setItem(LOCAL_STORAGE_API_URL, apiUrl);
    }
}

const recordFingerPrint = () => {
    const existingId = localStorage.getItem(LOCAL_STORAGE_UNIQ_ID)
    if(existingId == null) {
        const fpPromise = FingerprintJS.load()
        fpPromise.then(fp => fp.get()).then((result:GetResult) =>  {
            const hash = MD5(result.visitorId).toString();
            localStorage.setItem(LOCAL_STORAGE_UNIQ_ID, hash)
        });
    }
}

export const attachTelemetryToWindow = () => {
    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
        (window as any).printTelemetry = retrieveTelemetry;
    }
}