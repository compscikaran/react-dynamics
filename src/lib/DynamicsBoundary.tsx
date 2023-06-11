import React, { Component, ErrorInfo, ReactNode } from 'react'
import { DynamicEvents } from './constants'
import { isEventConfigured } from './service/registrationService'
import Telemetry from './service/DynamicsTelemetry'
import { saveEmeraldTelemetry } from './service/telemetryService'

type ComponentProps = {
  componentName: string;
  children?: ReactNode;
}

type ComponentState = {
  hasError: boolean;
}

export default class DynamicsBoundary extends React.Component<ComponentProps, ComponentState> {

  state = {
    hasError: false,
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    if(isEventConfigured(DynamicEvents.ERROR)) {
      const telemetry = new Telemetry(this.props.componentName, DynamicEvents.ERROR, errorInfo.componentStack)
      saveEmeraldTelemetry(telemetry)
    }
  }

  render() {
    if(this.state.hasError) {
        return <></>
    }
    return this.props.children
  }
}
