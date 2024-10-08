import { FormEvent, useEffect, useState } from "react";
import { useGetAllUsersQuery } from "../../Features/LandingPage/UserSlice";
import LoginPassword from "./LoginPassword";
import LoginUsername from "./LoginUsername";
import { useNavigate } from "react-router-dom";

type propsType = {
  setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setCurrentID: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const LoginPage = ({ setIsLoggedIn, setCurrentID }: propsType) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);
  const [memorizeUser, setMemorizeUser] = useState(false);

  const navigate = useNavigate();

  const { data: userApiData, error, isError } = useGetAllUsersQuery("User");

  const HandleLogin = (id: number) => {
    setErrorMessage("");
    if (memorizeUser) {
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

  const LoginForm = (
    <form className="main">
      <div className="form-container">
        <LoginUsername username={username} setUsername={setUsername} />
        <LoginPassword password={password} setPassword={setPassword} />
        <div className="btn-container">
          <div className="memorized-user">
            <label htmlFor="memUser">Remember Me</label>
            <input
              type="checkbox"
              id="memUser"
              checked={memorizeUser ? true : false}
              onClick={() => setMemorizeUser(!memorizeUser)}
            />
          </div>
          <button
            type="button"
            className="btn2"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password
          </button>
          <button
            className="btn1"
            type="submit"
            disabled={!isValid}
            onClick={(e: FormEvent) => HandleSubmit(e)}
          >
            Login
          </button>
        </div>
        <p className="error-text">{errorMessage}</p>
      </div>
    </form>
  );

  return LoginForm;
};

export default LoginPage;
