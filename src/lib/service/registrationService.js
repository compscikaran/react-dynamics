import _ from "lodash";
import localforage, { config } from "localforage";
import { attachTelemetryToWindow } from "./telemetryService";
import MD5 from "crypto-js/md5";
import { LOCAL_STORAGE_API_URL, LOCAL_STORAGE_APP_NAME, LOCAL_STORAGE_TELEMETRY, LOCAL_STORAGE_UNIQ_ID } from "../constants";

export const configureAnalytics = (configs) => {
    console.log(configs)
    if(configs.applicationName) {
        registerEmerald(configs.applicationName);
    }
    if(configs.captureEvents) {
        configureEmeraldEvents(configs.captureEvents);
    }
    if(configs.apiUrl) {
        configureEmeraldWorker(configs.apiUrl);
    }
    if(configs.devConsole) {
        configureEmeraldDevConsole();
    }
    if(configs.captureAnonymizedId) {
        recordIpAddressHash();
    }
}

export const registerEmerald = (applicationName) => {
    registerApplication(applicationName);
    registerServiceWorker();
}

const registerApplication = (applicationName) => {
    if(!_.isEmpty(applicationName)) {
        localStorage.setItem(LOCAL_STORAGE_APP_NAME, applicationName);
        localforage.setItem(LOCAL_STORAGE_APP_NAME, applicationName);
    }
}

export const configureEmeraldEvents = (events) => {
    if(events.length > 0) {
        localStorage.setItem(LOCAL_STORAGE_TELEMETRY, events.join(';'));
    }
}

export const configureEmeraldDevConsole = () => {
    attachTelemetryToWindow();
}

export const isEventConfigured = (emeraldEvent) => {
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

export const configureEmeraldWorker = (apiUrl) => {
    if(!_.isEmpty(apiUrl)) {
        localStorage.setItem(LOCAL_STORAGE_API_URL, apiUrl);
        localforage.setItem(LOCAL_STORAGE_API_URL, apiUrl);
    }
}

const recordIpAddressHash = () => {
    const existingId = localStorage.getItem(LOCAL_STORAGE_UNIQ_ID)
    if(existingId == null) {
        fetch('https://api.db-ip.com/v2/free/self').then(data => {
                return data.json();
            }).then(content => {
                const ip = content.ipAddress
                const hash = MD5(ip).toString();
                localStorage.setItem(LOCAL_STORAGE_UNIQ_ID, hash);
        });
    }
}