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
    if(config.apiUrl) {
        configureEmeraldWorker(configs.apiUrl);
    }
    if(config.devConsole) {
        configureEmeraldDevConsole();
    }
}

export const registerEmerald = (applicationName) => {
    registerApplication(applicationName);
    navigator.serviceWorker.getRegistrations().then(registrations => {
        if(registrations != undefined && registrations.length > 0) {
            for (let index = 0; index < registrations.length; index++) {
                const element = registrations[index];
                if(element.active.scriptURL.includes('emeraldWorker')) {
                    return;    
                }
            }
        }
        registerServiceWorker();
    });
}

const registerApplication = (applicationName) => {
    if(!_.isEmpty(applicationName)) {
        const appChannel = new BroadcastChannel("application-name");
        appChannel.postMessage(applicationName);
        appChannel.close();
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
    const apiChannel = new BroadcastChannel("api-url");
    apiChannel.postMessage(apiUrl);
    apiChannel.close();
}