//Import Dependecies
import { useState } from "react";
import { Route, Routes } from "react-router-dom";
//Import All the Components that will be Routed
import LandingPage from "../LoginPages/LandingPage";
import LandingMain from "../LoginPages/LandingMain";
import LoginPage from "../LoginPages/LoginPage";
import ForgotPassword from "../LoginPages/ForgotPassword";
import ResetVerification from "../LoginPages/ResetVerification";
import ResetPassword from "../LoginPages/ResetPassword";
import CreateAccount from "../CreateAccountPage/CreateAccount";
import SecurityQuestions from "../CreateAccountPage/SecurityQuestions";
import ErrorNotFoundPage from "../LoginPages/ErrorNotFoundPage";
//Import Custom Type
import { userType } from "../../Types/LandingTypes";

//Props Type for User ID, and the Setters for User ID and IsLoggedIn
type propsType = {
  currentID: string | undefined;
  setCurrentID: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoggedOutRouter = ({
  currentID,
  setCurrentID,
  setIsLoggedIn,
}: propsType): JSX.Element => {
  //Define the User Variable
  const [user, setUser] = useState<userType>({
    username: "",
    email: "",
    password: "",
  });
  //Define our Router when Logged Out
  const Router = (
    <Routes>
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
          element={<ResetVerification currentID={currentID as string} />}
        />
        <Route
          path="/password-reset"
          element={<ResetPassword currentID={currentID as string} />}
        />
        <Route
          path="/create-account"
          element={<CreateAccount setUser={setUser} />}
        />
        <Route
          path="/security-question"
          element={<SecurityQuestions user={user} />}
        />
      </Route>
      <Route path="*" element={<ErrorNotFoundPage />} />
    </Routes>
  );
  return Router;
};

export default LoggedOutRouter;
