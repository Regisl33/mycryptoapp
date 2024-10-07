import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
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
import Parameters from "./Components/Parameters";
import AllCoinsDataTable from "./Components/AllCoinsDataTable";
import SearchPage from "./Components/SearchPage";
import IndividualCoinData from "./Components/IndividualCoinData";
import ErrorNotFoundPage from "./Components/ErrorNotFoundPage";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentID, setCurrentID] = useState<number>();
  const [user, setUser] = useState<userType>({
    username: "",
    email: "",
    password: "",
  });

  const { coinID } = useParams();

  useEffect(() => {
    if (window.localStorage.selectedID) {
      setIsLoggedIn(true);
      setCurrentID(window.localStorage.selectedID);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/home" element={<Home currentID={currentID} />} />
            <Route
              path="/settings"
              element={
                <Parameters
                  setIsLoggedIn={setIsLoggedIn}
                  setCurrentID={setCurrentID}
                  currentID={currentID}
                />
              }
            />
            <Route
              path="/table"
              element={<AllCoinsDataTable currentID={currentID} />}
            />
            <Route
              path="/search"
              element={<SearchPage currentID={currentID} />}
            />
            <Route
              path="/coin"
              element={<IndividualCoinData currentID={currentID} />}
            />
            <Route path="*" element={<ErrorNotFoundPage />} />
          </>
        ) : (
          <>
            <Route path="/" element={<LandingPage />}>
              <Route path="/" index element={<LandingMain />} />
              <Route
                path="/login"
                element={
                  <LoginPage
                    setIsLoggedIn={setIsLoggedIn}
                    setCurrentID={setCurrentID}
                  />
                }
              />
              <Route
                path="/forgot-password"
                element={<ForgotPassword setCurrentID={setCurrentID} />}
              />
              <Route
                path="/security-verification"
                element={<ResetVerification currentID={currentID} />}
              />
              <Route
                path="/password-reset"
                element={<ResetPassword currentID={currentID} />}
              />
              <Route
                path="/create-account"
                element={<Create_Account setUser={setUser} />}
              />
              <Route
                path="/security-question"
                element={<Security_Questions user={user} />}
              />
            </Route>
            <Route path="*" element={<ErrorNotFoundPage />} />
          </>
        )}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
