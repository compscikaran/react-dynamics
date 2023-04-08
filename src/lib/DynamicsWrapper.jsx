import React, { useEffect, useRef } from 'react'
import { saveEmeraldTelemetry } from './service/telemetryService';
import Telemetry from './service/Telemetry';
import { DynamicEvents } from './constants';
import { useLocation } from 'react-router-dom';
import DynamicsBoundary from './DynamicsBoundary';
import { isEventConfigured } from './service/registrationService';

const withDynamics = (Component, componentName) => {
  return (props) => {

    const ref = useRef();
    const location = useLocation();
    useEffect(() => {
      if(isEventConfigured(DynamicEvents.MOUNT)) {
        const mountTelemetry = new Telemetry(componentName, DynamicEvents.MOUNT, location.pathname);
        saveEmeraldTelemetry(mountTelemetry);
      }
      return () => {
        const unmountTelemetry = new Telemetry(componentName, DynamicEvents.UNMOUNT, location.pathname);
        saveEmeraldTelemetry(unmountTelemetry);
      }
    }, []);

    const captureMouseOver = () => {
      if(isEventConfigured(DynamicEvents.MOUSEOVER)) {
        const mouseOver = new Telemetry(componentName, DynamicEvents.MOUSEOVER, location.pathname);
        saveEmeraldTelemetry(mouseOver);
      }
    }

    
    const capctureMouseClick = () => {
      if(isEventConfigured(DynamicEvents.MOUSECLICK)) {
        const mouseClick = new Telemetry(componentName, DynamicEvents.MOUSECLICK, location.pathname);
        saveEmeraldTelemetry(mouseClick);
      }
    }

    return (
      <div onMouseOver={captureMouseOver} onClick={capctureMouseClick} ref={ref}>
        <DynamicsBoundary componentName={componentName}>
          <Component id={componentName} {...props} />
        </DynamicsBoundary>
      </div>
    )
  }
}

export default withDynamics;
