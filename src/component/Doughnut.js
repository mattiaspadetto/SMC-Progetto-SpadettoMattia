import React from "react";
import DonutChart from "react-svg-donut";
import { useFetch } from "../Fetch/Fetch";

export default function MyComponent() {
  const { data, isLoaded, error, fetchAgain } = useFetch(
    "http://localhost:8011/dataTypeDocument",
    "GET"
  );

  const typeDocs = [
    { name: "TipoUno", value: data[0].TipoUno },
    { name: "TipoDue", value: data[0].TipoDue },
    { name: "TipoTre", value: data[0].TipoTre },
    { name: "TIpoQuattro", value: data[0].TipoQuattro },
    { name: "TipoCinque", value: data[0].TipoCinque },
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
