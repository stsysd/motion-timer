import { useDeviceSide } from "../hooks/useDeviceSide";
import { Clock, type Status as ClockStatus } from "./Clock";
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

export const IntervalTimer = ({ workDuration, breakDuration }: IntervalTimerProps) => {
  const [working, setWorking] = useState(true);
  const duration = working ? workDuration : breakDuration;
  const color = working ? "#fa2e60" : "#1cbeb9";
  const refHandle = useRef<number | null>(null);

  const side = useDeviceSide();

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
    if (side === "HEAD" && refHandle.current) {
      clearInterval(refHandle.current);
      refHandle.current = null;
      setWorking((w) => !w);
    }
  }, [side]);

  return <>
    <Clock
      duration={duration}
      color={color}
      onChange={onChange}
    />
  </>;
};

