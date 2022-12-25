importScripts('https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js');

self.addEventListener('activate', e => {
    console.log('Service Worker activated');
    setInterval(fetchTelemetry, 120000);
});

const fetchTelemetry = () => {
    // get the values from store
    localforage.getItem('applicationName').then((appName) => {
        if(appName == null) {
            console.log('Application not registered yet');
            // return;
        }
        const telemetryKey =  appName + 'Telemetry';
        localforage.getItem(telemetryKey).then((val) => {
            console.log(val);
            localforage.removeItem(telemetryKey);
        });
    });
}