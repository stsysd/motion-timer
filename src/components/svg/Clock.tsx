import { Face } from "./Face";
import { useCountUp } from "../../hooks/useCountUp";
import { useCallback, useEffect, useState } from "react";
import { useWakeLock } from "../../hooks/useWakeLock";

export type Status = "setup" | "ready" | "running" | "paused" | "finished";

type ClockProps = {
  blind: boolean;
  duration: number;
  color?: string;
  onChange?: (status: Status) => void;
};

export const Clock = ({ blind, duration, color, onChange }: ClockProps) => {
  color = color ?? "#fa2e60";
  const [status, setStatus] = useState<Status>("setup");

  const handleChange = useCallback(
    (s: Status) => setStatus(s),
    [setStatus],
  );

  useEffect(() => onChange?.(status), [status]);
  useEffect(() => setStatus("setup"), [duration]);

  if (status === "setup") {
    return (
      <>
        <ClockNotReady
          color={color}
          onDone={() => handleChange("ready")}
          duration={800}
        />
      </>
    );
  }

  return (
    <>
      <ClockReady
        blind={blind}
        duration={duration}
        color={color}
        onChange={handleChange}
      />
    </>
  );
};

type ClockReadyProps = {
  blind: boolean;
  duration: number;
  color: string;
  onChange?: (status: Status) => void;
};

const ClockReady = ({ blind, duration, color, onChange }: ClockReadyProps) => {
  const [status, setStatus] = useState<Status>("ready");
  const countUp = useCountUp(status === "running");
  const rate = Math.min(countUp.elapsed / duration, 1);

  useWakeLock(status === "running");

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

  useEffect(() => onChange?.(status), [status]);

  return (
    <Face value={1 - rate} faceColor={color ?? "fa2e60"} />
  );
};

type ClockNotReadyProps = {
  color: string;
  duration?: number;
  onDone: () => void;
};

const ClockNotReady = ({ color, duration, onDone }: ClockNotReadyProps) => {
  duration = duration ?? 1000;
  const [done, setDone] = useState(false);
  const countUp = useCountUp();
  const rate = Math.min(countUp.elapsed / duration, 1);

  useEffect(() => {
    if (rate >= 1 && !done) {
      setDone(true);
      onDone();
    }
  }, [rate, done, onDone]);

  return (
    <Face value={rate} faceColor={color} />
  );
};
