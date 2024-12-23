import React, { createContext } from "react";

const MyContext = createContext({
  isStarted: false,
  isEnded: false,
  maxWicket: 0,
  maxOver: 0,
  currentRun: 0,
  targetRun: 0,
  currentWicket: { team1: 0, team2: 0 },
  currentScore: { team1: 0, team2: 0 },
  over: 0,
  ball: 0,
  innings: "1",
});

export default MyContext;
