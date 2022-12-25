import React, { useEffect, useRef } from 'react'
import { saveEmeraldTelemetry } from './service/telemetryService';
import Telemetry from './service/Telemetry';
import { EmeraldEvents } from './constants';
import { useLocation } from 'react-router-dom';

const withEmerald = (Component, componentName) => {
  return (props) => {

    const ref = useRef();
    const location = useLocation();
    useEffect(() => {
      const obj = new Telemetry(componentName, EmeraldEvents.MOUNT, location.pathname);
      saveEmeraldTelemetry(obj);
    }, []);

    const captureMouseOver = () => {
      const mouseOver = new Telemetry(componentName, EmeraldEvents.MOUSEOVER, location.pathname);
      saveEmeraldTelemetry(mouseOver);
    }

    
    const capctureMouseClick = () => {
      const mouseClick = new Telemetry(componentName, EmeraldEvents.MOUSECLICK, location.pathname);
      saveEmeraldTelemetry(mouseClick);
    }

    return (
      <div onMouseOver={captureMouseOver} onClick={capctureMouseClick} ref={ref}>
        <Component id={componentName} {...props} />
      </div>
    )
  }
}

export default withEmerald;
