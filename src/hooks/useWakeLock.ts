import { useEffect, useRef } from "react";

export const useWakeLock = (lock: boolean) => {
  const refWakeLock = useRef<WakeLockSentinel | null>(null);
  useEffect(() => {
    if (lock) {
      navigator.wakeLock.request("screen").then((sentinel) => {
        refWakeLock.current = sentinel;
      });
    } else {
      refWakeLock.current?.release().then(() => {
        refWakeLock.current = null;
      });
    }
  }, [lock]);
};
