import { useState, useEffect } from "react";

type DeviceOrientation = Pick<DeviceOrientationEvent, "alpha" | "beta" | "gamma">;

export const useDeviceOrientation = (): DeviceOrientation => {
  const [deviceOrientation, setDeviceOrientation] = useState<DeviceOrientation>({
    alpha: null,
    beta: null,
    gamma: null,
  });

  useEffect(() => {
    window.addEventListener(
      "deviceorientation",
      (e) => {
        setDeviceOrientation({ alpha: e.alpha, beta: e.beta, gamma: e.gamma });
      },
      false,
    );
  }, []);

  return deviceOrientation;
};
