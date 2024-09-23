import { Face } from "./svg/Face";
import { useCountUp } from "../hooks/useCountUp";
import { useCallback, useEffect, useState } from "react";
import { useWakeLock } from "../hooks/useWakeLock";
import { useDeviceSide } from "../hooks/useDeviceSide";

export type Status = "setup" | "ready" | "running" | "paused" | "finished";

type ClockProps = {
  duration: number;
  color?: string;
  onChange?: (status: Status) => void;
};

export const Clock = ({ duration, color, onChange }: ClockProps) => {
  color = color ?? "#fa2e60";
  const [status, setStatus] = useState<Status>("setup");

  const handleChange = useCallback(
    (s: Status) => {
      setStatus(s);
    },
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
      <ClockReady duration={duration} color={color} onChange={handleChange} />
    </>
  );
};

type ClockReadyProps = {
  duration: number;
  color: string;
  onChange?: (status: Status) => void;
};

const ClockReady = ({ duration, color, onChange }: ClockReadyProps) => {
  const side = useDeviceSide();

  const [status, setStatus] = useState<Status>("ready");
  const countUp = useCountUp(status === "running");
  const rate = Math.min(countUp.elapsed / duration, 1);

  useWakeLock(status === "running");

  useEffect(() => {
    setStatus((s) => {
      if (s === "finished" && side == "HEAD") return "setup";
      if (s === "running" && side === "HEAD") return "paused";
      if (s === "paused" && side === "TAIL") return "running";
      if (s === "ready" && side === "TAIL") return "running";
      if (rate >= 1) return "finished";
      return s;
    });
  }, [side, rate]);

  useEffect(() => onChange?.(status), [status]);

  return (
    <>
      <svg className="clock">
        <Face value={1 - rate} faceColor={color ?? "fa2e60"} />
      </svg>
    </>
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
    <>
      <svg className="clock">
        <Face value={rate} faceColor={color} />
      </svg>
    </>
  );
};
