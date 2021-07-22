export default function LabelPeriod({ x, y, valueLabelPeriod }) {
  return (
    <>
      <text x={x} y={y} fontSize="1 !important">
        {valueLabelPeriod}
      </text>
    </>
  );
}
