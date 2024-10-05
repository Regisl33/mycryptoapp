import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/Home";
import LandingPage from "./Components/LoginPages/LandingPage";
import LandingMain from "./Components/LoginPages/LandingMain";
import LoginPage from "./Components/LoginPages/LoginPage";
import ForgotPassword from "./Components/LoginPages/ForgotPassword";
import ResetVerification from "./Components/LoginPages/ResetVerification";
import ResetPassword from "./Components/LoginPages/ResetPassword";
import Create_Account from "./Components/CreateAccountPage/CreateAccount";
import { userType } from "./Types/LandingTypes";
import Security_Questions from "./Components/CreateAccountPage/SecurityQuestions";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedID, setSelectedID] = useState<number>();

  const [user, setUser] = useState<userType>({
    username: "",
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   if (window.localStorage.selectedID !== null) {
  //     setIsLoggedIn(true);
  //   } else {
  //     setIsLoggedIn(false);
  //   }
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<LandingPage />}>
            <Route path="/" index element={<LandingMain />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/security-verification"
              element={<ResetVerification />}
            />
            <Route path="/password-reset" element={<ResetPassword />} />
            <Route
              path="/create-account"
              element={<Create_Account setUser={setUser} />}
            />
            <Route
              path="/security-question"
              element={<Security_Questions user={user} />}
            />
          </Route>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
