import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import LandingPage from "./Components/LandingPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (window.localStorage.selectedID) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="*"
          element={
            isLoggedIn ? (
              <Home userID={window.localStorage.selectedID} />
            ) : (
              <LandingPage />
            )
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
