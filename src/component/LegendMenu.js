import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

export default function LegendMenu({
  Title,
  FirstEl,
  SecondEl,
  ThirdEl,
  colorFirstEl,
  colorSecondEl,
  colorThirdEl,
}) {
  return (
    <>
      <div className="legend-menu flex-column">
        <span>{Title}</span>
        <ul>
          {FirstEl ? (
            <li className="flex-start-row">
              <FiberManualRecordIcon style={{ color: colorFirstEl }} />
              <h4>{FirstEl}</h4>
            </li>
          ) : null}
          {SecondEl ? (
            <li className="flex-start-row">
              <FiberManualRecordIcon style={{ color: colorSecondEl }} />
              <h4>{SecondEl}</h4>
            </li>
          ) : null}
          {ThirdEl ? (
            <li className="flex-start-row">
              <FiberManualRecordIcon style={{ color: colorThirdEl }} />
              <h4>{ThirdEl}</h4>
            </li>
          ) : null}
        </ul>
      </div>
    </>
  );
}
