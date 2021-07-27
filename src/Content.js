import React, { useReducer } from "react";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Button from "@material-ui/core/Button";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { DateTime } from "luxon";
import Graphic from "./component/Graphic";
import DoughnutGraphic from "./component/Doughnut";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";

export default function ContentDashboard() {
  const [anchorEl, setAnchorEl] = React.useState(false);
  const [selectOption, setSelectOption] = React.useState("Spazi condivisi");
  const options = ["Spazio 1", "Spazio 2", "Spazio 3"];
  const docsType = ["Tipo 1", "Tipo 2", "Tipo 3"];
  const docsAction = ["creazione", "modifica", "eliminazione"];

  const handleClick = () => {
    setAnchorEl(!anchorEl);
  };

  const initialState = {
    space: "Mia attività",
    actionsDocs: { creazione: true, modifica: true, eliminazione: true },
    period: "weeks",
    date: DateTime.local(),
  };

  function reducer(state, action) {
    switch (action.type) {
      case "setSpace":
        return {
          ...state,
          space: action.payload,
        };
      case "setActionDocs":
        return {
          ...state,
          actionsDocs: {
            ...state.actionsDocs,
            [action.payload]: !state.actionsDocs[action.payload],
          },
        };
      case "setPeriod":
        return {
          ...state,
          period: action.payload,
        };
      case "incrementPeriod":
        return { ...state, date: state.date.plus({ [state.period]: 1 }) };
      case "decrementPeriod":
        return { ...state, date: state.date.minus({ [state.period]: 1 }) };
      default:
        throw new Error();
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  const calculatePeriod = () => {
    if (state.period === "weeks") {
      return state.date.startOf("week").day;
    } else if (state.period === "months") {
      return state.date.startOf("month").day;
    } else {
      return state.date.startOf("year").month;
    }
  };

  const startDataTime =
    state.period === "weeks"
      ? state.date.startOf("week").day + "/" + state.date.startOf("week").month
      : state.period === "months"
      ? state.date.startOf("month").day +
        "/" +
        state.date.startOf("month").month
      : state.date.startOf("year").day + "/" + state.date.startOf("year").month;

  const endDataTime =
    state.period === "weeks"
      ? state.date.endOf("week").day + "/" + state.date.endOf("week").month
      : state.period === "months"
      ? state.date.endOf("month").day + "/" + state.date.endOf("month").month
      : state.date.endOf("year").day + "/" + state.date.endOf("year").month;

  const requestToServer = {
    spazio: state.space,
    azioniDocumenti: state.actionsDocs,
    dataInizio: startDataTime,
    dataFine: endDataTime,
    anno: state.date.year,
    periodoVisualizzazione: state.period,
  };

  fetch("http://localhost:8005/attivita", {
    method: "POST",
    headers: { "Content-type": "application/json" },
    body: JSON.stringify(requestToServer),
  }).then(() => {
    console.log("Send Request");
  });

  return (
    <>
      <div className="content">
        <div className="header flex-start-row">
          <ButtonGroup variant="text">
            <Button
              color={state.space === "Mia attività" ? "primary" : "default"}
              onClick={() =>
                dispatch({ type: "setSpace", payload: "Mia attività" })
              }
            >
              Mia attività
            </Button>
            <Button
              color={state.space === selectOption ? "primary" : "default"}
            >
              <span onClick={handleClick}>{selectOption}</span>
              {anchorEl ? (
                <div className="dropdown-menu flex-column">
                  {options.map((option, index) => (
                    <span
                      key={index}
                      color={"default"}
                      onClick={() => {
                        setAnchorEl(false);
                        setSelectOption(option);
                        dispatch({ type: "setSpace", payload: option });
                      }}
                    >
                      {option}
                    </span>
                  ))}
                </div>
              ) : null}
            </Button>
            <Button
              color={state.space === "Globale" ? "primary" : "default"}
              onClick={() => dispatch({ type: "setSpace", payload: "Globale" })}
            >
              Globale
            </Button>
          </ButtonGroup>
        </div>
        <div className="type-visualization-report flex-row">
          <div>
            <span>Azioni sui documenti: </span>
            <ButtonGroup>
              <Button
                color={
                  state.actionsDocs["creazione"] === true
                    ? "primary"
                    : "default"
                }
                onClick={() =>
                  dispatch({
                    type: "setActionDocs",
                    payload: "creazione",
                  })
                }
              >
                Creazione
              </Button>
              <Button
                color={
                  state.actionsDocs["modifica"] === true ? "primary" : "default"
                }
                onClick={() =>
                  dispatch({
                    type: "setActionDocs",
                    payload: "modifica",
                  })
                }
              >
                Modifica
              </Button>
              <Button
                color={
                  state.actionsDocs["eliminazione"] === true
                    ? "primary"
                    : "default"
                }
                onClick={() =>
                  dispatch({
                    type: "setActionDocs",
                    payload: "eliminazione",
                  })
                }
              >
                Eliminazione
              </Button>
            </ButtonGroup>
          </div>
          <div>
            <span>Visualizza per: </span>
            <ButtonGroup>
              <Button
                color={state.period === "weeks" ? "primary" : "default"}
                onClick={() =>
                  dispatch({
                    type: "setPeriod",
                    payload: "weeks",
                  })
                }
              >
                Settimana
              </Button>
              <Button
                color={state.period === "months" ? "primary" : "default"}
                onClick={() =>
                  dispatch({
                    type: "setPeriod",
                    payload: "months",
                  })
                }
              >
                Mese
              </Button>
              <Button
                color={state.period === "years" ? "primary" : "default"}
                onClick={() =>
                  dispatch({
                    type: "setPeriod",
                    payload: "years",
                  })
                }
              >
                Anno
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <div className="report flex-column">
          <Button className="flex-row">
            <ArrowBackIosIcon
              style={{ cursor: "pointer" }}
              onClick={() =>
                dispatch({
                  type: "decrementPeriod",
                })
              }
            />
            {state.period === "weeks" ? (
              <span>
                {state.date.startOf("week").day}{" "}
                {state.date.startOf("week").monthLong} -{" "}
                {state.date.endOf("week").day}{" "}
                {state.date.endOf("week").monthLong} {state.date.year}
              </span>
            ) : null}
            {state.period === "months" ? (
              <span>
                {state.date.monthLong} {state.date.year}
              </span>
            ) : null}
            {state.period === "years" ? (
              <span>Anno {state.date.year}</span>
            ) : null}
            {state.date.plus({ [state.period]: 1 }) >
            initialState.date ? null : (
              <ArrowForwardIosIcon
                style={{ cursor: "pointer" }}
                onClick={() =>
                  dispatch({
                    type: "incrementPeriod",
                  })
                }
              />
            )}
          </Button>
          <span style={{ maxHeight: "5%" }}>
            <h3>Report sull'attività documentale</h3>
          </span>
          <div className="actionsGraphic flex-row">
            <div style={{ width: "70%" }}>
              <Graphic
                azioneDocumenti={state.actionsDocs}
                valuePeriod={calculatePeriod()}
                Period={state.period}
                MonthLength={state.date.daysInMonth}
              />
            </div>

            <div className="legend-menu flex-column">
              <span>Azioni sui documenti</span>
              {docsAction.map((action, index) => (
                <h4 className="flex-start-row" key={index}>
                  <FiberManualRecordIcon className="iconList" id={action} />
                  {action}
                </h4>
              ))}
            </div>
          </div>
          <span style={{ maxHeight: "5%" }}>
            <h3>
              Report sulla tipologia di documenti:
              {state.actionsDocs["creazione"] === true ? " creati" : null}
              {state.actionsDocs["modifica"] === true ? " modificati" : null}
              {state.actionsDocs["eliminazione"] === true ? " eliminati" : null}
            </h3>
          </span>
          <div className="actionsGraphic flex-row">
            <div style={{ width: "70%", textAlign: "center" }}>
              <DoughnutGraphic />
            </div>
            <div className="legend-menu flex-column">
              <span>Tipologia di documenti più utilizzati</span>
              {docsType.map((type, index) => (
                <h4 className="flex-start-row" key={index}>
                  <FiberManualRecordIcon
                    className="iconList"
                    id={`Tipo${index}`}
                  />
                  {type}
                </h4>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
