//Import Dependencies
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//Import Get Users Hook
import { useGetAllUsersQuery } from "../../Features/LandingPage/UserSlice";
//Import Login Username and Password Input
import LoginPassword from "./LoginPassword";
import LoginUsername from "./LoginUsername";
//PropsType need To be able to change the current User ID and the Login State.
type LoginPropsType = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentID: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const LoginPage = ({ setIsLoggedIn, setCurrentID }: LoginPropsType) => {
  //Username and Password State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  //Error State
  const [errorMessage, setErrorMessage] = useState("");
  //Check The Validity of The Form State
  const [isValid, setIsValid] = useState(false);
  //State the handle if the user want to stay logged in or not
  const [memorizeUser, setMemorizeUser] = useState(false);
  //Define Navigate
  const navigate = useNavigate();
  //Get Users data from BD
  const { data: userApiData, error, isError } = useGetAllUsersQuery("User");
  //Login Function, gets the user ID and change the current user ID and the login state, than navigate to the user home page.
  const HandleLogin = (id: number) => {
    setErrorMessage("");
    if (memorizeUser) {
      //Test if the user want to staty logged in!
      window.localStorage.selectedID = id;
    } else {
      if (window.localStorage.selectedID) {
        window.localStorage.removeItem("selectedID");
      }
    }
    setCurrentID(id);
    navigate("/home");
    setIsLoggedIn(true);
  };
  //Submit Function, it verify if the user and password correspond to an existing account and update the error message accordingly. If we have a match we call the login function with the corresponding ID.
  const HandleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (userApiData?.ids) {
      let accountID = userApiData.ids.filter(
        (id) => userApiData.entities[id].username === username
      );
      if (accountID.length > 0) {
        userApiData.entities[accountID[0]].password === password
          ? HandleLogin(userApiData.entities[accountID[0]].id)
          : setErrorMessage("incorrect password!");
      } else {
        setErrorMessage("We couldn't find an account with this username");
      }
    } else {
      setErrorMessage("Sorry, we couldn't reach the server, please try again");
    }
  };
  //The useEffect test if we are able to get the user data, and also if we have a valid form or not. It set the error message and isValid state accordingly.
  useEffect(() => {
    if (isError) {
      setErrorMessage("Sorry, we couldn't reach the server, please try again");
      setIsValid(false);
      console.log(error);
    } else if (username.length > 0 && password.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [isError, username, password, error]);
  //Checkbox that controls the memorizedUser State
  const memorizedUserInput = (
    <div className="memorized-user">
      <label htmlFor="memUser">Remember Me</label>
      <input
        type="checkbox"
        id="memUser"
        checked={memorizeUser ? true : false}
        onClick={() => setMemorizeUser(!memorizeUser)}
      />
    </div>
  );
  //Forgot Button Navigate to Forgot Password Page
  const forgotButton = (
    <button
      type="button"
      className="btn2"
      onClick={() => navigate("/forgot-password")}
    >
      Forgot Password
    </button>
  );
  //Login Button, Submits the form
  const loginButton = (
    <button
      className="btn1"
      type="submit"
      disabled={!isValid}
      onClick={(e: FormEvent) => HandleSubmit(e)}
    >
      Login
    </button>
  );

  const LoginForm = (
    <form className="main">
      <div className="form-container">
        {/* calls the Username Input */}
        <LoginUsername username={username} setUsername={setUsername} />
        {/* calls the Password Input */}
        <LoginPassword password={password} setPassword={setPassword} />
        <div className="btn-container">
          {memorizedUserInput}
          {forgotButton}
          {loginButton}
        </div>
        {/* this display the current error */}
        <p className="error-text">{errorMessage}</p>
      </div>
    </form>
  );

  return LoginForm;
};

export default LoginPage;
