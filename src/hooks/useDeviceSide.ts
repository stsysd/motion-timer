
import { useDeviceOrientation } from "./useDeviceOrientation";

export type DeviceSide = "HEAD" | "TAIL";

export const useDeviceSide = (threthold: number = 180): DeviceSide => {
  const { beta } = useDeviceOrientation();
  if (beta === null) return "HEAD";
  return Math.abs(beta) < threthold / 2 ? "HEAD" : "TAIL";
}
