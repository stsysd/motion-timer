
export type CircleLineProps = {
  color: string;
  center?: [x: number, y: number];
  radius: number;
  width: number;
};

export const CircleLine = ({ color, center, radius, width }: CircleLineProps) => {
  center = center ?? [0, 0];
  return (
    <circle
      cx={center[0]} cy={center[1]} r={radius}
      stroke={color} strokeWidth={width} fill="none"
      className="drop-shadow"
    />);
}
