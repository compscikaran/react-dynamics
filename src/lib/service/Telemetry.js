import { LOCAL_STORAGE_UNIQ_ID } from "../constants";

class Telemetry {
    constructor(componentName, event, url) {
        this.componentName = componentName;
        this.event = event;
        this.eventTimestamp = new Date().toUTCString();
        this.url = url;
        this.uniqueIdentifier = localStorage.getItem(LOCAL_STORAGE_UNIQ_ID);
    }
}

export default Telemetry;