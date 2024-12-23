import { MdSportsCricket } from "react-icons/md";
import { useState, useEffect, useContext, useRef } from "react";
import MyContext from "./context";

export function Starting() {
  const [showing, setShowing] = useState(false);
  const { isStarted, setIsStarted, setMaxWicket, setMaxOver } =
    useContext(MyContext);
  const Wickets = useRef();
  const Overs = useRef();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowing(true);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const maxWicketValue = Wickets.current.value;
    const maxOverValue = Overs.current.value;
    if (maxWicketValue > 0 && maxOverValue > 0) {
      setMaxWicket(maxWicketValue);
      setMaxOver(maxOverValue);
      setIsStarted(true);
    } else {
      alert("Please enter valid values greater than 0");
    }
  };

  return (
    <>
      {!showing && (
        <div className="h-screen w-full border1 border-gray-500 bg-1 text-white flex flex-col justify-center items-center gap-3 text-center">
          <MdSportsCricket className="text-6xl transition-transform transform animate-bounce" />
          <h1 className="font-bold sm:text-2xl md:text-4xl lobster-regular animate-spiral">
            <span className="text-orange-300"> Hello</span> Cri
            <span className="text-blue-300">c</span>ket{" "}
            <span className="text-green-500">Lovers</span>
          </h1>
        </div>
      )}
      {showing && (
        <div className="h-screen w-screen border border-green-900 flex justify-center items-center p-8 bg-gradient-to-r from-green-500 to-yellow-500">
          <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 xl:w-1/3 p-8 bg-gradient-to-b from-blue-800 to-blue-400 rounded-lg">
            {/* Form for Maximum Over Count */}
            <form onSubmit={handleOnSubmit} className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-5 justify-between items-center sm:items-start">
                <label
                  htmlFor="Overs"
                  className="text-white text-2xl lobster-regular"
                >
                  Maximum Over Count
                </label>
                <input
                  type="number"
                  name="overs"
                  id="Overs"
                  min={1} // Minimum value is now 1 to ensure valid input
                  ref={Overs}
                  className="h-8 w-32 focus:outline-none p-2 border rounded-full text-center"
                />
              </div>

              {/* Form for Maximum Wickets Count */}
              <div className="flex flex-col sm:flex-row gap-5 justify-between items-center sm:items-start">
                <label
                  htmlFor="Wickets"
                  className="text-white text-2xl lobster-regular"
                >
                  Maximum Wickets Count
                </label>
                <input
                  type="number"
                  name="wickets"
                  id="Wickets"
                  min={1} // Minimum value is now 1 to ensure valid input
                  ref={Wickets}
                  className="h-8 w-32 focus:outline-none p-2 border rounded-full text-center"
                />
              </div>

              {/* Start Button */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  className="bg-green-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-green-600 transition"
                >
                  Start
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
