import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import LandingPage from "./Components/LandingPage";
import { fetchCoinData } from "./Features/CoinGeeckoData/CoinDataSlice";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedID, setSelectedID] = useState<number>();

  useEffect(() => {
    if (window.localStorage.selectedID !== null) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            isLoggedIn ? (
              <Home
                userID={
                  window.localStorage.selectedID
                    ? window.localStorage.selectedID
                    : selectedID
                }
              />
            ) : (
              <LandingPage
                selectedID={selectedID}
                setSelectedID={setSelectedID}
              />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
