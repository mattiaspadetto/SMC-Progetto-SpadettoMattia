import React from "react";
import DonutChart from "react-svg-donut";

export default function DoughnutGraphic({ dataDonut }) {
  return (
    <DonutChart
      size={250}
      title={"Documenti"}
      data={dataDonut}
      onHover={() => null}
      innerRadius={0.6}
      outerRadius={1}
      activeOffset={0.1}
    />
  );
}
