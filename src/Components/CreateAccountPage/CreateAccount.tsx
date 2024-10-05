import { FormEvent, useState } from "react";
import { userType } from "../../Types/LandingTypes";
import CreateUsername from "./CreateUsername";
import CreateEmail from "./CreateEmail";
import CreatePassword from "./CreatePassword";
import CreateConfirm_Password from "./CreateConfirmPassword";
import { useNavigate } from "react-router-dom";

type propsType = {
  setUser: React.Dispatch<React.SetStateAction<userType>>;
};

const CreateAccount = ({ setUser }: propsType) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [usernameValid, setUsernameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);

  const navigate = useNavigate();

  const handleValidForm = (): boolean => {
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

  const handleSubmit = (e: FormEvent) => {
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
    navigate("/security-question");
  };

  const CreateAccountForm = (
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
          onClick={(e: FormEvent) => handleSubmit(e)}
          disabled={handleValidForm()}
        >
          Next
        </button>
      </div>
    </form>
  );

  return CreateAccountForm;
};

export default CreateAccount;
