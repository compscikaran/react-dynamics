import React, { useEffect, useRef } from 'react'
import { saveEmeraldTelemetry } from './service/telemetryService';
import Telemetry from './service/Telemetry';
import { EmeraldEvents } from './constants';
import { useLocation } from 'react-router-dom';
import EmeraldBoundary from './EmeraldBoundary';
import { isEventConfigured } from './service/registrationService';

const withEmerald = (Component, componentName) => {
  return (props) => {

    const ref = useRef();
    const location = useLocation();
    useEffect(() => {
      if(isEventConfigured(EmeraldEvents.MOUNT)) {
        const mountTelemetry = new Telemetry(componentName, EmeraldEvents.MOUNT, location.pathname);
        saveEmeraldTelemetry(mountTelemetry);
      }
    }, []);

    const captureMouseOver = () => {
      if(isEventConfigured(EmeraldEvents.MOUSEOVER)) {
        const mouseOver = new Telemetry(componentName, EmeraldEvents.MOUSEOVER, location.pathname);
        saveEmeraldTelemetry(mouseOver);
      }
    }

    
    const capctureMouseClick = () => {
      if(isEventConfigured(EmeraldEvents.MOUSECLICK)) {
        const mouseClick = new Telemetry(componentName, EmeraldEvents.MOUSECLICK, location.pathname);
        saveEmeraldTelemetry(mouseClick);
      }
    }

    return (
      <div onMouseOver={captureMouseOver} onClick={capctureMouseClick} ref={ref}>
        <EmeraldBoundary componentName={componentName}>
          <Component id={componentName} {...props} />
        </EmeraldBoundary>
      </div>
    )
  }
}

export default withEmerald;
