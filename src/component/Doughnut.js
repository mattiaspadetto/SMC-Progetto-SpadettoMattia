import React from "react";
import DonutChart from "react-svg-donut";
import { useFetch } from "../Fetch/Fetch";

export default function DoughnutGraphic() {
  const { data, isLoaded, error, fetchAgain } = useFetch(
    "http://localhost:8011/dataTypeDocument",
    "GET"
  );

  const typeDocs = [
    { name: "TipoUno", value: 30 },
    { name: "TipoDue", value: 20 },
    { name: "TipoTre", value: 9 },
    { name: "TIpoQuattro", value: 7 },
    { name: "TipoCinque", value: 4 },
  ];

  if (error) {
    return <div>Error. Please refresh the page</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <DonutChart
        size={300}
        title={"Documenti"}
        data={typeDocs}
        onHover={(i) => {
          if (i >= 0) {
            console.log(typeDocs[i].name);
          }
        }}
        innerRadius={0.6}
        outerRadius={1}
        activeOffset={0.1}
      />
    );
  }
}
