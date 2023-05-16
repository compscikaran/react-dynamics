import React, { ComponentType, useEffect, useRef } from 'react'
import { saveEmeraldTelemetry } from './service/telemetryService';
import DynamicsTelemetry from './service/DynamicsTelemetry';
import { DynamicEvents } from './constants';
import { useLocation } from 'react-router-dom';
import DynamicsBoundary from './DynamicsBoundary';
import { isEventConfigured } from './service/registrationService';

const withDynamics = <T extends object>(InputComponent: ComponentType<T>, componentName: string) => {
  return (props: T) => {

    const ref = useRef<HTMLDivElement>(null);
    const location = useLocation();
    
    useEffect(() => {
      if(isEventConfigured(DynamicEvents.MOUNT)) {
        const mountTelemetry = new DynamicsTelemetry(componentName, DynamicEvents.MOUNT, location.pathname);
        saveEmeraldTelemetry(mountTelemetry);
      }
      return () => {
        const unmountTelemetry = new DynamicsTelemetry(componentName, DynamicEvents.UNMOUNT, location.pathname);
        saveEmeraldTelemetry(unmountTelemetry);
      }
    }, []);

    const captureMouseOver = () => {
      if(isEventConfigured(DynamicEvents.MOUSEOVER)) {
        const mouseOver = new DynamicsTelemetry(componentName, DynamicEvents.MOUSEOVER, location.pathname);
        saveEmeraldTelemetry(mouseOver);
      }
    }

    
    const capctureMouseClick = () => {
      if(isEventConfigured(DynamicEvents.MOUSECLICK)) {
        const mouseClick = new DynamicsTelemetry(componentName, DynamicEvents.MOUSECLICK, location.pathname);
        saveEmeraldTelemetry(mouseClick);
      }
    }

    return (
      <div onMouseOver={captureMouseOver} onClick={capctureMouseClick} ref={ref}>
        <DynamicsBoundary componentName={componentName}>
          <InputComponent id={componentName} {...props} />
        </DynamicsBoundary>
      </div>
    )
  }
}

export default withDynamics;
