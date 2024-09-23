import { useCallback, useEffect, useRef, useState } from "react";

export type CountUp = {
  elapsed: number;
  reset(): void;
};

export const useCountUp = (running: boolean = true): CountUp => {
  const refLastTime = useRef<number | null>(null);
  const refHandle = useRef<number>();
  const [elapsed, setElapsed] = useState<number>(0);
  const reset = useCallback(() => setElapsed(0), []);

  const loop = (ts: number = performance.now()) => {
    if (refLastTime.current != null) {
      setElapsed((e) => e + ts - refLastTime.current!);
    }
    refLastTime.current = ts;
    refHandle.current = requestAnimationFrame(loop);
  };

  useEffect(() => {
    if (running) {
      loop();
      return () => {
        if (refHandle.current) {
          cancelAnimationFrame(refHandle.current);
        }
      };
    }
    refLastTime.current = null;
  }, [running]);

  return { elapsed, reset };
};
