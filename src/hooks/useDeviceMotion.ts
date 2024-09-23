import { useState, useEffect } from "react";

type DeviceMotion = Pick<DeviceMotionEvent, "acceleration" | "accelerationIncludingGravity" | "rotationRate">

export const useDeviceMotion = (): DeviceMotion => {
  const [deviceMotion, setDeviceMotion] = useState<DeviceMotion>({
    acceleration: null,
    accelerationIncludingGravity: null,
    rotationRate: null,
  });

  useEffect(() => {
    window.addEventListener(
      "devicemotion",
      (e) => {
        setDeviceMotion({
          acceleration: e.acceleration,
          accelerationIncludingGravity: e.accelerationIncludingGravity,
          rotationRate: e.rotationRate,
        });
      },
      false,
    );
  }, []);

  return deviceMotion;
};
