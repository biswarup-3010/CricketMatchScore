import { useContext, useState } from "react";
import MyContext from "./context";

export const MainPage = () => {
  const {
    maxWicket,
    maxOver,
    targetRun,
    setTargetRun,
    currentWicket,
    setCurrentWicket,
    currentScore,
    setCurrentScore,
    setIsEnded,
    over,
    setOver,
    ball,
    setBall,
    innings,
    setInnings,
  } = useContext(MyContext);

  const [bclicked, setBclicked] = useState(false);
  const [wclicked, setWclicked] = useState(false);
  const [nclicked, setNclicked] = useState(false);
  const [display, setDisplay] = useState("Start Delivery");

  const handleScoreUpdate = (num) => {
    if (bclicked === true) {
      setBall(ball + 1);
      if (ball >= 5) {
        setOver(over + 1);
        setBall(0);
      }
      if (over >= maxOver) {
        if (innings === "1") {
          setInnings("2");
          setOver(0);
        } else {
          setIsEnded(true);
        }
      }
    }
    setBclicked(false);
    setWclicked(false);
    setNclicked(false);
    setDisplay("Start Delivery");

    if (num === "w") {
      // Handle Wicket
      if (innings === "1") {
        setCurrentWicket((prev) => ({
          ...prev,
          team1: prev.team1 + 1,
        }));
        if (currentWicket.team1 + 1 >= maxWicket) {
          setTargetRun(currentScore.team1);
          setInnings("2");
          setCurrentWicket((prev) => ({
            ...prev,
            team2: 0, // Reset wickets for team2
          }));
        }
      } else {
        setCurrentWicket((prev) => ({
          ...prev,
          team2: prev.team2 + 1,
        }));
        if (currentWicket.team2 + 1 >= maxWicket) {
          setIsEnded(true);
        }
      }
    } else {
      // Handle Runs
      const runs = parseInt(num, 10);
      if (innings === "1") {
        setCurrentScore((prev) => ({
          ...prev,
          team1: prev.team1 + runs,
        }));
      } else {
        setCurrentScore((prev) => ({
          ...prev,
          team2: prev.team2 + runs,
        }));
        if (currentScore.team2 + runs > targetRun) {
          setIsEnded(true);
        }
      }
    }
  };

  return (
    <div className="h-screen w-screen text-white bg-black lobster-regular flex flex-col">
      {/* Main Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-2 h-full">
        {/* First Section */}
        <section className="flex flex-col items-center justify-center bg-gray-800 p-4">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl">
            {innings === "1" ? "First Innings" : "Second Innings"}
          </h1>
          <div className="mt-8">
            {innings === "1" && (
              <h1 className="text-4xl sm:text-5xl">
                {currentScore.team1} - {currentWicket.team1}
              </h1>
            )}
            {innings === "2" && (
              <>
                <h1 className="text-4xl sm:text-5xl">
                  {currentScore.team2} - {currentWicket.team2}
                </h1>
                <br />
                <h2>
                  {over}.{ball}Overs
                </h2>
              </>
            )}
          </div>
          <h3 className="mt-6 text-xl sm:text-2xl">This Over</h3>
        </section>

        {/* Second Section */}
        <section className="flex flex-col items-center justify-center p-8 lg:p-16">
          {/* Delivery Buttons */}
          <div className="flex gap-4 mb-8">
            <button
              className="border text-blue-500 border-gray-400 h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 bg-white rounded-full hover:bg-green-200"
              onClick={() => {
                setBclicked(true);
                setWclicked(false);
                setNclicked(false);
                setDisplay("Fine Delivery");
              }}
            >
              B
            </button>
            <button
              className="border border-gray-900 h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 bg-gray-500 rounded-full hover:bg-gray-700"
              onClick={() => {
                setBclicked(false);
                setWclicked(true);
                setNclicked(false);
                setDisplay("Wide Ball");
              }}
            >
              WB
            </button>
            <button
              className="border border-red-900 h-12 w-12 sm:h-14 sm:w-14 lg:h-16 lg:w-16 bg-red-500 rounded-full hover:bg-red-700"
              onClick={() => {
                setBclicked(false);
                setWclicked(false);
                setNclicked(true);
                setDisplay("No Ball");
              }}
            >
              NB
            </button>
          </div>

          {/* Display */}
          <label className="text-white font-bold bg-black p-4 text-xl sm:text-2xl">
            {display}
          </label>

          {/* Score Buttons */}
          <div
            className={`grid grid-cols-3 gap-4 mt-8 w-full sm:max-w-md m-auto ${
              bclicked || wclicked || nclicked
                ? ""
                : "pointer-events-none opacity-50"
            }`}
          >
            {[0, 1, 2, 3, 4, 5, 6, 7, "w"].map((num) => (
              <button
                key={num}
                className={`border border-blue-100 h-16 w-26 sm:h-14 sm:w-26 lg:h-16 lg:w-26 rounded ${
                  nclicked
                    ? "bg-red-500 hover:bg-red-700"
                    : wclicked
                    ? "bg-gray-500 hover:bg-gray-700"
                    : bclicked
                    ? "bg-white text-blue-500"
                    : ""
                }`}
                onClick={() => handleScoreUpdate(num)}
              >
                {num}
              </button>
            ))}
          </div>
        </section>
      </section>
    </div>
  );
};
