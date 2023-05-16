import { LOCAL_STORAGE_UNIQ_ID } from "../constants";

class DynamicsTelemetry {

    componentName: string;
    event: string;
    eventTimestamp: string;
    url: string;
    uniqueIdentifier: string;

    constructor(componentName: string, event: string, url: string) {
        this.componentName = componentName;
        this.event = event;
        this.eventTimestamp = new Date().toUTCString();
        this.url = url;
        this.uniqueIdentifier = localStorage.getItem(LOCAL_STORAGE_UNIQ_ID) || '';
    }

    toString() {
        return "Telemetry[" + [this.componentName, this.event.toString(), 
            this.eventTimestamp, this.url, this.uniqueIdentifier].join(",") + "]";
    }
}

export default DynamicsTelemetry;