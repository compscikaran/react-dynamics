importScripts('https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js');

let apiUrl = '';
let appName = '';

const apiChannel = new BroadcastChannel("api-url");
const appChannel = new BroadcastChannel("application-name");

apiChannel.addEventListener('message', e => {
    if(e.data != undefined) {
        apiUrl = e.data;
    }
});

appChannel.addEventListener('message', e => {
    if(e.data != undefined) {
        appName = e.data;
    }
});

self.addEventListener('activate', e => {
    console.log('Service Worker activated');
    setInterval(fetchTelemetry, 120000);
});

const fetchTelemetry = () => {
    // get the values from store
    console.log(apiUrl);
    console.log(appName);
    const telemetryKey =  appName + 'Telemetry';
    localforage.getItem(telemetryKey).then((val) => {
        console.log(val);
        localforage.removeItem(telemetryKey);
    });
}