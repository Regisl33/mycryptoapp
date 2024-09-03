import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import LandingPage from "./Components/LandingPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={isLoggedIn ? <Home /> : <LandingPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
