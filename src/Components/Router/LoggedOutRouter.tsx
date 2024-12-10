import { useState } from "react";
import { Route } from "react-router-dom";
import LandingPage from "../LoginPages/LandingPage";
import LandingMain from "../LoginPages/LandingMain";
import LoginPage from "../LoginPages/LoginPage";
import ForgotPassword from "../LoginPages/ForgotPassword";
import ResetVerification from "../LoginPages/ResetVerification";
import ResetPassword from "../LoginPages/ResetPassword";
import CreateAccount from "../CreateAccountPage/CreateAccount";
import SecurityQuestions from "../CreateAccountPage/SecurityQuestions";
import ErrorNotFoundPage from "../LoginPages/ErrorNotFoundPage";
import { userType } from "../../Types/LandingTypes";

type propsType = {
  currentID: number | undefined;
  setCurrentID: React.Dispatch<React.SetStateAction<number | undefined>>;
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
};

const LoggedOutRouter = ({
  currentID,
  setCurrentID,
  setIsLoggedIn,
}: propsType) => {
  const [user, setUser] = useState<userType>({
    username: "",
    email: "",
    password: "",
  });

  const Router = (
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
          element={<ResetVerification currentID={currentID as number} />}
        />
        <Route
          path="/password-reset"
          element={<ResetPassword currentID={currentID as number} />}
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
    </>
  );
  return Router;
};

export default LoggedOutRouter;
