import React from "react";
import DonutChart from "react-svg-donut";
/* import { useFetch } from "../Fetch/Fetch"; */

export default function DoughnutGraphic() {
  /*   const { data, isLoaded, error, fetchAgain } = useFetch(
    "http://localhost:8040/dataTypeDocs",
    "GET"
  ); */

  const typeDocs = [
    {
      name: 0,
      value: 2,
    },
    {
      name: 1,
      value: 9,
    },
    {
      name: 2,
      value: 6,
    },
    {
      name: 3,
      value: 29,
    },
    {
      name: 4,
      value: 16,
    },
    {
      name: 5,
      value: 22,
    },
  ];

  /*   if (error) {
    return <div>Error. Please refresh the page</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else { */
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
  /*   }
   */
}
