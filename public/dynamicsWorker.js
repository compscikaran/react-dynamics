importScripts('https://cdnjs.cloudflare.com/ajax/libs/localforage/1.10.0/localforage.min.js');

self.addEventListener('activate', e => {
    console.log('Service Worker activated');
    setInterval(runFetch, 5000);
});

const runFetch = () => {
    fetchTelemetry();
}

const fetchTelemetry = async () => {
    
    // Get Application Unique name
    const appName = await localforage.getItem('applicationName');

    const data = [];
    const keys = [];

    // Fetch data from Indexed DB
    await localforage.iterate((value, key, iterationNumber) => {
        if(key.startsWith(appName)) {
            data.push(value);
            keys.push(key);        
        }
    });

    console.log(data);
    // Write Logic here to send data to External System e.g. via REST API

    // Cleanup data from Indexed DB
    for (const element of keys) {
        await localforage.removeItem(element);
    }
}