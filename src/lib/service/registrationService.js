import _ from "lodash";
import localforage from "localforage";

const registerEmerald = (applicationName) => {
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
        localforage.setItem('applicationName', applicationName);
    }
}

export const configureEmeraldEvents = (events) => {
    if(events.length > 0) {
        localStorage.setItem('configuredEvents', events.join(';'));
    }
}

export const isEventConfigured = (emeraldEvent) => {
    const events = localStorage.getItem('configuredEvents') || '';
    console.log(events);
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

export default registerEmerald;