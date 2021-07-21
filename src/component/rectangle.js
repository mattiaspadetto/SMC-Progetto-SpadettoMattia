import { Tooltip } from "@material-ui/core";

export default function Rectangle({ x, y, height, width, value, colorRect }) {
  return (
    <>
      <Tooltip title={value} placement={"top"}>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={colorRect}
          className={"rect"}
        />
      </Tooltip>
    </>
  );
}
