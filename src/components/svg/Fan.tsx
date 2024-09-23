export type FanProps = {
  color: string;
  center?: [x: number, y: number];
  radius: number;
  angle: [start: number, end: number];
};

export const Fan = ({ color, center, radius, angle }: FanProps) => {
  center = center ?? [0, 0];
  if (angle[1] - angle[0] >= 2 * Math.PI) {
  return <circle cx={center[0]} cy={center[1]} r={radius} fill={color} />;
  }

  const arcStart = [
    center[1] - radius * Math.sin(angle[0]),
    center[0] - radius * Math.cos(angle[0]),
  ];
  const arcEnd = [
    center[1] - radius * Math.sin(angle[1]),
    center[0] - radius * Math.cos(angle[1]),
  ];
  const large = angle[1] - angle[0] > Math.PI ? 1 : 0;
  const sweep = angle[1] - angle[0] > 0 ? 0 : 1;
  const d = [
    `M ${center[0]} ${center[1]}`,
    `L ${arcStart[0]} ${arcStart[1]}`,
    `A ${radius} ${radius} 0 ${large} ${sweep} ${arcEnd[0]} ${arcEnd[1]}`,
    `Z`,
  ].join(" ");
  return <path d={d} fill={color} stroke="none" />
};

