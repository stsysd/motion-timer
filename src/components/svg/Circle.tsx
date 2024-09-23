export type CircleProps = {
  color?: string;
  center?: [x: number, y: number];
  radius: number;
};

export const Circle= ({ color, center, radius }: CircleProps) => {
  center = center ?? [0, 0];
  return (
    <circle
      cx={center[0]} cy={center[1]} r={radius}
      stroke="none" fill={color}
    />);
}
