import { useEffect, useRef } from "react"
import { isEventConfigured } from "./service/registrationService"
import { DynamicEvents } from "./constants"
import DynamicsTelemetry from "./service/DynamicsTelemetry"
import { saveEmeraldTelemetry } from "./service/telemetryService"

import ReactDOM from "react-dom"
import { useLocation } from "react-router-dom"
import { useEffectTelemetry } from "./useEffectTelemetry"

export const useDynamics = (componentName: string) => {

  const ref = useRef<HTMLDivElement>(null);
  const location = useLocation();
  useEffectTelemetry(componentName, location);

  useEffect(() => {
    let domNode = ReactDOM.findDOMNode(ref.current);
    if (domNode && isEventConfigured(DynamicEvents.MOUSECLICK)) {
      domNode.addEventListener('click', () => {
        const mouseClick = new DynamicsTelemetry(componentName, DynamicEvents.MOUSECLICK, location.pathname);
        saveEmeraldTelemetry(mouseClick);
      })
    }

    if (domNode && isEventConfigured(DynamicEvents.MOUSEOVER)) {
      domNode.addEventListener('mouseover', () => {
        const mouseClick = new DynamicsTelemetry(componentName, DynamicEvents.MOUSEOVER, location.pathname);
        saveEmeraldTelemetry(mouseClick);
      })
    }
  }, [])

  return ref
}