//Import Dependencies
import { FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
//Import 4 Inputs Components
import CreateUsername from "./CreateUsername";
import CreateEmail from "./CreateEmail";
import CreatePassword from "./CreatePassword";
import CreateConfirm_Password from "./CreateConfirmPassword";
//Import userType for the propsType
import { userType } from "../../Types/LandingTypes";
//SetUser Props to pass the user to the security question page
type setUserPropsType = {
  setUser: React.Dispatch<React.SetStateAction<userType>>;
};

const CreateAccount = ({ setUser }: setUserPropsType) => {
  //Username, Email, Password and Passowrd Verification State
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  //Those State make sure the Username, Password and Email are matching their corresponding Regex
  const [usernameValid, setUsernameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  //Define Navigate
  const navigate = useNavigate();
  //This function test is the form is valid and can be submitted or not
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
  //Submit Function, it set the user with the current Username, Email and Password. Then it reset the input and navigate to security question page
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
  //Submit Button, calls the submit function and can only be clicked if the form is valid
  const SubmitButton = (
    <button
      type="submit"
      className="btn1"
      onClick={(e: FormEvent) => handleSubmit(e)}
      disabled={handleValidForm()}
    >
      Next
    </button>
  );
  //Create Account Page Structure, Main class adds the background, form container class handle the display, and title class gives the title his style.
  const CreateAccountForm = (
    <form className="main">
      <div className="form-container">
        <h2 className="title account-title">
          Enter your information to create your account
        </h2>
        {/* Calls the username controled input */}
        <CreateUsername
          username={username}
          setUsername={setUsername}
          usernameValid={usernameValid}
          setUsernameValid={setUsernameValid}
        />
        {/* Calls the email controled input */}
        <CreateEmail
          email={email}
          setEmail={setEmail}
          emailValid={emailValid}
          setEmailValid={setEmailValid}
        />
        {/* Calls the password controled input */}
        <CreatePassword
          password={password}
          setPassword={setPassword}
          passwordValid={passwordValid}
          setPasswordValid={setPasswordValid}
        />
        {/* Calls the confirm password controled input */}
        <CreateConfirm_Password
          confirmPassword={confirmPassword}
          password={password}
          setConfirmPassword={setConfirmPassword}
        />
        {SubmitButton}
      </div>
    </form>
  );

  return CreateAccountForm;
};

export default CreateAccount;
