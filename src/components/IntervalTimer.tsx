import { useDeviceOrientation } from "../hooks/useDeviceOrientation";
import { Clock, type Status as ClockStatus } from "./svg/Clock";
import { useCallback, useEffect, useRef, useState } from "react";

function vibrate(...pattern: number[]) {
  if (navigator.vibrate) {
    navigator.vibrate(pattern);
  }
}

type IntervalTimerProps = {
  workDuration: number;
  breakDuration: number;
};

type DeviceSide = "HEAD" | "TAIL";

const useDeviceSide = (threthold: number = 180): DeviceSide => {
  const { beta } = useDeviceOrientation();
  if (beta === null) return "HEAD";
  return Math.abs(beta) < threthold / 2 ? "HEAD" : "TAIL";
}

export const IntervalTimer = ({ workDuration, breakDuration }: IntervalTimerProps) => {
  const [working, setWorking] = useState(true);
  const duration = working ? workDuration : breakDuration;
  const color = working ? "#fa2e60" : "#1cbeb9";
  const className = ["full", working ? "working" : "breaking"].join(" ");

  const side = useDeviceSide();
  const blind = side === "TAIL";

  const refHandle = useRef<number | null>(null);
  const onChange = useCallback((status: ClockStatus) => {
    switch (status) {
      case "finished":
        vibrate(300, 300, 300, 300, 300);
        refHandle.current = window.setInterval(() => {
          vibrate(300, 300, 300, 300, 300);
        }, 15 * 1000);
        return;
      case "running":
      case "paused":
        vibrate(100, 100, 100);
        return;
    }
  }, [])

  useEffect(() => {
    if (!blind && refHandle.current) {
      clearInterval(refHandle.current);
      refHandle.current = null;
      setWorking((w) => !w);
    }
  }, [blind]);

  return <>
    <svg className={className}>
      <Clock
        blind={blind}
        duration={duration}
        color={color}
        onChange={onChange}
      />
    </svg>
    {blind ? <div className="full overlay" /> : null}
  </>;
};

