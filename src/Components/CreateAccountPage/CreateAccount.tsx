import { FormEvent, useState } from "react";
import { userType } from "../../Types/LandingTypes";
import CreateUsername from "./CreateUsername";
import CreateEmail from "./CreateEmail";
import CreatePassword from "./CreatePassword";
import CreateConfirm_Password from "./CreateConfirmPassword";

type propsType = {
  setDisplay: React.Dispatch<
    React.SetStateAction<
      | "account"
      | "login"
      | "password"
      | "home"
      | "security"
      | "verification"
      | "reset"
    >
  >;
  setUser: React.Dispatch<React.SetStateAction<userType>>;
};

const Create_Account = ({ setDisplay, setUser }: propsType) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [usernameValid, setUsernameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const handle_Valid_Form = (): boolean => {
    if (
      usernameValid &&
      emailValid &&
      passwordValid &&
      password === confirmPassword
    ) {
      return false;
    } else {
      return true;
    }
  };

  const handle_Submit = (e: FormEvent) => {
    e.preventDefault();
    setUser({
      username,
      email,
      password,
    });
    setUsername("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setDisplay("security");
  };

  const Create_Account_Form = (
    <form className="main">
      <div className="form-container">
        <h2 className="title account-title">
          Enter your information to create your account
        </h2>
        <CreateUsername
          username={username}
          setUsername={setUsername}
          usernameValid={usernameValid}
          setUsernameValid={setUsernameValid}
        />
        <CreateEmail
          email={email}
          setEmail={setEmail}
          emailValid={emailValid}
          setEmailValid={setEmailValid}
        />
        <CreatePassword
          password={password}
          setPassword={setPassword}
          passwordValid={passwordValid}
          setPasswordValid={setPasswordValid}
        />
        <CreateConfirm_Password
          confirmPassword={confirmPassword}
          password={password}
          setConfirmPassword={setConfirmPassword}
        />
        <button
          type="submit"
          className="btn1"
          onClick={(e: FormEvent) => handle_Submit(e)}
          disabled={handle_Valid_Form()}
        >
          Next
        </button>
      </div>
    </form>
  );

  return Create_Account_Form;
};

export default Create_Account;
