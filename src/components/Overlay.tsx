import { useDeviceSide } from "../hooks/useDeviceSide";

export const Overlay = () => {
  const side = useDeviceSide();
  return side === "TAIL" ?<div className = "overlay" /> : null;
};
