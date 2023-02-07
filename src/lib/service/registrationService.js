import _ from "lodash";
import localforage, { config } from "localforage";
import { attachTelemetryToWindow } from "./telemetryService";

export const configureEmerald = (configs) => {
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
}

export const registerEmerald = (applicationName) => {
    registerApplication(applicationName);
    registerServiceWorker();
}

const registerApplication = (applicationName) => {
    if(!_.isEmpty(applicationName)) {
        localStorage.setItem('applicationName', applicationName);
        localforage.setItem('applicationName', applicationName);
    }
}

export const configureEmeraldEvents = (events) => {
    if(events.length > 0) {
        localStorage.setItem('configuredEvents', events.join(';'));
    }
}

export const configureEmeraldDevConsole = () => {
    attachTelemetryToWindow();
}

export const isEventConfigured = (emeraldEvent) => {
    const events = localStorage.getItem('configuredEvents') || '';
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
                .register('./emeraldWorker.js')
                .then(reg => console.log('Service Worker registered'))
                .catch(error => console.log('Service worker failed: ' + error));
        });
    }
}

export const configureEmeraldWorker = (apiUrl) => {
    if(!_.isEmpty(apiUrl)) {
        localStorage.setItem('apiUrl', apiUrl);
        localforage.setItem('apiUrl', apiUrl);
    }
}