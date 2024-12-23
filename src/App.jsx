import React, { useState } from "react";
import MyContext from "./assets/context";
import { Starting } from "./assets/Starting";
import "./App.css";

export default function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [maxWicket, setMaxWicket] = useState(0);
  const [maxOver, setMaxOver] = useState(0);
  const [currentRun, setCurrentRun] = useState(0);
  const [targetRun, setTargetRun] = useState(0);
  const [currentWicket, setCurrentWicket] = useState({ team1: 0, team2: 0 });
  const [currentScore, setCurrentScore] = useState({ team1: 0, team2: 0 });

  return (
    <MyContext.Provider
      value={{
        maxWicket,
        setMaxWicket,
        maxOver,
        setMaxOver,
        currentRun,
        setCurrentRun,
        targetRun,
        setTargetRun,
        currentWicket,
        setCurrentWicket,
        currentScore,
        setCurrentScore,
        isStarted,
        setIsStarted,
        isEnded,
        setIsEnded,
      }}
    >
      {!isStarted && <Starting />}
    </MyContext.Provider>
  );
}
