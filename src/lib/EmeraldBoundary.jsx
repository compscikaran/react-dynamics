import React, { Component } from 'react'
import { EmeraldEvents } from './constants';
import { isEventConfigured } from './service/registrationService';
import Telemetry from './service/Telemetry';
import { saveEmeraldTelemetry } from './service/telemetryService';

export default class EmeraldBoundary extends Component {

  state = {
    hasError: false,
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    if(isEventConfigured(EmeraldEvents.ERROR)) {
      const telemetry = new Telemetry(this.props.componentName, EmeraldEvents.ERROR, errorInfo.componentStack);
      saveEmeraldTelemetry(telemetry);
    }
  }

  render() {
    if(this.state.hasError) {
        return <></>
    }
    return this.props.children;
  }
}
