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