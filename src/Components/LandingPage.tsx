import { useState } from "react";
import LandingMain from "./LandingMain";
import LoginPage from "./LoginPage";
import CreateAccount from "./CreateAccount";
import PasswordReset from "./PasswordReset";
import SecurityQuestions from "./SecurityQuestions";

const LandingPage = () => {
  const year = new Date().getFullYear();
  const [display, setDisplay] = useState<
    "home" | "login" | "password" | "account" | "security"
  >("home");

  const setMainDisplay = () => {
    switch (display) {
      case "home":
        return <LandingMain setDisplay={setDisplay} />;
      case "login":
        return <LoginPage setDisplay={setDisplay} />;
      case "account":
        return <CreateAccount />;
      case "password":
        return <PasswordReset />;
      case "security":
        return <SecurityQuestions />;
      default:
        return <LandingMain setDisplay={setDisplay} />;
    }
  };

  return (
    <div className="landing-container">
      <header>
        <h1>Welcome to CryptoMaster</h1>
        {display !== "home" ? null : (
          <div className="header-btn-container">
            <button className="btn2" onClick={() => setDisplay("login")}>
              Sign In
            </button>
            <button className="btn2" onClick={() => setDisplay("account")}>
              Sign Up
            </button>
          </div>
        )}
      </header>
      <div className="landing-main-container">{setMainDisplay()}</div>
      <footer>
        <p>Powered by Coingecko Api</p>
        <p className="copyright">All right reserved &copy; {year}</p>
      </footer>
    </div>
  );
};

export default LandingPage;
