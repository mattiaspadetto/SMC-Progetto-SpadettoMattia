import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

export default function LegendMenu({
  Title,
  FirstEl,
  SecondEl,
  ThirdEl,
  color1,
  color2,
  color3,
}) {
  return (
    <>
      <div className="legend-menu flex-column">
        <span>{Title}</span>
        <ul>
          <li className="flex-start-row">
            <FiberManualRecordIcon fill={color1} />
            <h4>{FirstEl}</h4>
          </li>
          <li className="flex-start-row">
            <FiberManualRecordIcon fill={color2} />
            <h4>{SecondEl}</h4>
          </li>
          <li className="flex-start-row">
            <FiberManualRecordIcon fill={color3} />
            <h4>{ThirdEl}</h4>
          </li>
        </ul>
      </div>
    </>
  );
}
