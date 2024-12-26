//Import Dependencies
import { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
//Import Custom Dispatch Function to Fetch the Coins
import { fetchCoinData } from "./Features/CoinGeeckoData/CoinDataSlice";
//Custom Typed UseDispatch Hook
import { useAppDispatch } from "./Store/Store";
//Import the Routers Components
import LoggedInRouter from "./Components/Router/LoggedInRouter";
import LoggedOutRouter from "./Components/Router/LoggedOutRouter";

const App = () => {
  //Define isLoggedIn, CurrentID and TempColor State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentID, setCurrentID] = useState<string>();
  const [tempColor, setTempColor] = useState("");
  //Define Dispatch With our Custom Typed UseDispatch Hook
  const dispatch = useAppDispatch();
  //This UseEffect Fetch the CoinData and Puts it in the Redux Store, and verify if our User is Remembered to be LoggedIn or if he is in a Current Session
  useEffect(() => {
    dispatch(fetchCoinData());
    if (window.localStorage.selectedID) {
      setIsLoggedIn(true);
      setCurrentID(window.localStorage.selectedID);
    } else if (window.sessionStorage.userID) {
      setIsLoggedIn(true);
      setCurrentID(window.sessionStorage.userID);
    } else {
      setIsLoggedIn(false);
    }
  }, [dispatch]);
  //Return our App with both Routers
  return (
    <BrowserRouter>
      {isLoggedIn ? (
        <LoggedInRouter
          currentID={currentID}
          tempColor={tempColor}
          setTempColor={setTempColor}
          setCurrentID={setCurrentID}
          setIsLoggedIn={setIsLoggedIn}
        />
      ) : (
        <LoggedOutRouter
          currentID={currentID}
          setCurrentID={setCurrentID}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
    </BrowserRouter>
  );
};

export default App;
