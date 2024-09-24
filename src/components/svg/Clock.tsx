import { Face } from "./Face";
import { useCountUp } from "../../hooks/useCountUp";
import { useEffect, useState } from "react";
import { useWakeLock } from "../../hooks/useWakeLock";

export type Status = "ready" | "running" | "paused" | "finished";

type ClockProps = {
  blind: boolean;
  duration: number;
  color?: string;
  onChange?: (status: Status) => void;
};

const useGaugeCap = (duration: number) => {
  const [done, setDone] = useState(false);
  const [elapsed, resetCountUp] = useCountUp(!done);
  const rate = elapsed / duration;

  const reset = () => {
    setDone(false);
    resetCountUp();
  };

  useEffect(() => {
    if (rate >= 1) {
      setDone(true);
    }
  }, [rate]);

  return [Math.min(rate, 1), reset] as const;
};

export const Clock = ({ blind, duration, color, onChange }: ClockProps) => {
  color = color ?? "#fa2e60";

  const [status, setStatus] = useState<Status>("ready");
  const [elapsed, resetCountUp] = useCountUp(status === "running");
  const [cap, resetCap] = useGaugeCap(800);
  const rate = Math.min(elapsed / duration, 1);
  const gauge = Math.min(cap, 1 - rate);

  useEffect(() => onChange?.(status), [status]);
  useEffect(() => setStatus("ready"), [duration]);

  useWakeLock(status === "running");

  useEffect(() => {
    if (status === "ready") {
      resetCap();
      resetCountUp();
    }
  }, [status]);

  useEffect(() => {
    setStatus((s) => {
      if (s === "finished") return "finished";
      if (s === "running" && !blind) return "paused";
      if (s === "paused" && blind) return "running";
      if (s === "ready" && blind) return "running";
      if (rate >= 1) return "finished";
      return s;
    });
  }, [blind, rate]);

  return (
    <Face value={gauge} faceColor={color} />
  );
};
