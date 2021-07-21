export default function LabelTick({ width, y, valueLabel }) {
  return (
    <>
      <text x="0" y={y + 5} fontSize="2 !important">
        {valueLabel}
      </text>
      <rect width={width} height="0.3" x="30" y={y} fill="lightgray" />
    </>
  );
}
