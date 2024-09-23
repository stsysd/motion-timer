import { Fan } from "./Fan";
import { CircleLine } from "./CircleLine";
import { Circle } from "./Circle";

const DefaultColor = "#144779";

type FaceProps = {
  faceColor?: string;
  value: number;
  onClick?: () => void;
};

export const Face = ({ faceColor, value, onClick }: FaceProps) => {
  faceColor = faceColor ?? DefaultColor;
  return (
    <g className="face">
      <Circle color="white" radius={100} />
      <g className="drop-shadow">
        <Fan color={faceColor} radius={100} angle={[0, 2 * Math.PI * value]} />
        <CircleLine color="white" radius={110} width={20} />
        <g onClick={onClick}>
          <Circle color="white" radius={30} />
        </g>
      </g>
      <Circle color="gray" center={[110, 0]} radius={5} />
      <Circle color="gray" center={[0, 110]} radius={5} />
      <Circle color="gray" center={[-110, 0]} radius={5} />
      <Circle color="gray" center={[0, -110]} radius={5} />
    </g>
  );
};
