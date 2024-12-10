import { useEffect, useState } from "react";
import { BrowserRouter, Routes } from "react-router-dom";
import { fetchCoinData } from "./Features/CoinGeeckoData/CoinDataSlice";
import { useAppDispatch } from "./Store/Store";
import LoggedInRouter from "./Components/Router/LoggedInRouter";
import LoggedOutRouter from "./Components/Router/LoggedOutRouter";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentID, setCurrentID] = useState<number>();
  const [tempColor, setTempColor] = useState("");

  const dispatch = useAppDispatch();

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

  return (
    <BrowserRouter>
      <Routes>
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
      </Routes>
    </BrowserRouter>
  );
};

export default App;
