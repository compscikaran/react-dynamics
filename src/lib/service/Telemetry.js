class Telemetry {
    constructor(componentName, event, url) {
        this.componentName = componentName;
        this.event = event;
        this.eventTimestamp = new Date().toUTCString();
        this.url = url;
    }
}

export default Telemetry;