import React from "react";
import DonutChart from "react-svg-donut";
import { useFetch } from "../Fetch/Fetch";

export default function MyComponent() {
  const { data, isLoaded, error, fetchAgain } = useFetch(
    "http://localhost:8011/dataTypeDocument",
    "GET"
  );

  const typeDocs = [
    { name: "Tipo 1", value: 30 },
    { name: "Tipo 2", value: 20 },
    { name: "Tipo 3", value: 17 },
    { name: "Tipo 4", value: 12 },
    { name: "Tipo 5", value: 4 },
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
