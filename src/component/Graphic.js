import { useEffect, useState } from "react";
import Rectangle from "./rectangle";
import LabelTick from "./labelTick";
import * as d3 from "d3-scale";
import { useFetch} from "../Fetch/Fetch";

// calcolo valori lungo asse delle ordinate

function calculateTicks(maxValue, minValue) {
  const count = 8;
  const ticks = new Array(count);
  const valueTick = d3
    .scaleLinear()
    .domain([0, count])
    .range([minValue, maxValue]);

  for (let i = 0; i < count + 1; i++) {
    ticks[i] = valueTick(i);
  }

  return ticks;
}

export default function Graphic({ azioneDocumenti }) {
  const { data, isLoaded, error, fetchAgain } = useFetch(
    "http://localhost:8010/data",
    "GET"
  );
  const [timerCount, setTimerCount] = useState(0);

  useEffect(() => {
    if (timerCount === 10) {
      fetchAgain();
      setTimerCount(0);
    }
  }, [timerCount]);

  const [maxValue, setMaxValue] = useState(350);
  const aspectRatio = 9 / 21;
  const canvasWidth = 800;
  const canvasHeight = canvasWidth * aspectRatio;
  const canvasPadding = 10;
  const minValue = 0;
  const canvasHeightMin = 0;
  const yTicks = calculateTicks(maxValue, minValue);

  //calculate x position rect
  const xOfRect = d3
    .scaleBand()
    .domain(new Array(data.length).fill(0).map((_, index) => index))
    .range([0, canvasWidth - 10])
    .paddingInner([0.1])
    .paddingOuter([1]);

  const widthRect = xOfRect(1);

  //calculate y position rect
  const yScale = d3
    .scaleLinear()
    .domain([minValue, maxValue])
    .range([canvasHeight - canvasPadding, canvasHeightMin + canvasPadding]);

  if (error) {
    return <div>Error. Please refresh the page</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <>
        <div>
          <svg viewBox={`0 0 ${canvasWidth} ${canvasHeight}`} width={"100%"}>
            {yTicks.map((value, index) => (
              <LabelTick
                key={index}
                y={yScale(value)}
                valueLabel={Math.round(value)}
                width={canvasWidth}
              />
            ))}

            {data.map((value, index) => {
              const heightCreate = () => {
                if (azioneDocumenti["creazione"] === true) {
                  return (
                    canvasHeight - yScale(data[index].create) - canvasPadding
                  );
                } else return 0;
              };

              const heightChange = () => {
                if (azioneDocumenti["modifica"] === true) {
                  return (
                    canvasHeight - yScale(data[index].change) - canvasPadding
                  );
                } else return 0;
              };

              let heightDeleted =
                canvasHeight - yScale(data[index].deleted) - canvasPadding;

              return (
                <>
                  {azioneDocumenti["creazione"] === true ? (
                    <Rectangle
                      x={xOfRect(index)}
                      y={yScale(data[index].create)}
                      height={heightCreate()}
                      width={xOfRect.bandwidth()}
                      value={data[index].create}
                      colorRect={"green"}
                    />
                  ) : null}
                  {azioneDocumenti["modifica"] === true ? (
                    <Rectangle
                      x={xOfRect(index)}
                      y={yScale(data[index].change) - heightCreate()}
                      height={heightChange()}
                      width={xOfRect.bandwidth()}
                      value={data[index].change}
                      colorRect={"red"}
                    />
                  ) : null}
                  {azioneDocumenti["eliminazione"] === true ? (
                    <Rectangle
                      x={xOfRect(index)}
                      y={
                        yScale(data[index].deleted) -
                        heightCreate() -
                        heightChange()
                      }
                      height={heightDeleted}
                      width={xOfRect.bandwidth()}
                      value={data[index].deleted}
                      colorRect={"orange"}
                    />
                  ) : null}
                </>
              );
            })}
          </svg>
        </div>
      </>
    );
  }
}
