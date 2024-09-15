import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import { userType } from "../Types/LandingTypes";
import { useGetAllUsersQuery } from "../Features/LandingPage/UserSlice";

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

const CreateAccount = ({ setDisplay, setUser }: propsType) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isValid, setIsValid] = useState(true);
  const [inputError, setInputError] = useState("");
  const [usernameError, setUsernameError] = useState(false);

  const { data: userApiData, error, isError } = useGetAllUsersQuery("User");

  const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

  const passwordRegex = new RegExp(
    /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.[\W]).{8,}$/
  );

  const handleUsernameError = () => {
    setInputError("This username already exist");
    setUsernameError(true);
  };

  const handleErrorMessage = () => {
    if (isError) {
      setInputError("Could't Reach the server try again");
      console.log(error);
    } else {
      if (username.length > 0) {
        if (userApiData?.ids) {
          if (userApiData.ids.length > 0) {
            userApiData.ids.map((id) =>
              userApiData.entities[id].username === username
                ? handleUsernameError()
                : null
            );
          }
        }
      } else if (email.length > 0 && !emailRegex.test(email)) {
        setInputError("Please Enter a Valid E-Mail Adress");
      } else if (password.length > 0 && !passwordRegex.test(password)) {
        setInputError(
          "Your password must be at least 8 character, have a capital letter, a number and a special character"
        );
      } else if (confirmPassword.length > 0 && password !== confirmPassword) {
        setInputError("Your Password confirmation doesn't match your password");
      } else setInputError("");
    }
  };

  useEffect(() => {
    if (
      username.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      emailRegex.test(email) &&
      passwordRegex.test(password) &&
      password === confirmPassword
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    handleErrorMessage();
  }, [username, password, confirmPassword, email]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setUser({
      username,
      email,
      password,
    });
    setDisplay("security");
  };

  return (
    <form className="main">
      <div className="form-container">
        <h2 className="title account-title">
          Enter your information to create your account
        </h2>
        <label className="offscreen" htmlFor="username">
          Username
        </label>
        <input
          autoComplete="off"
          className={
            username.length > 0
              ? usernameError
                ? "input error-input"
                : "input"
              : "input"
          }
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value.toLowerCase().trim())
          }
        />
        <label className="offscreen" htmlFor="email">
          Email
        </label>
        <input
          autoComplete="off"
          className={
            email.length > 0
              ? emailRegex.test(email)
                ? "input"
                : "input error-input"
              : "input"
          }
          type="text"
          id="email"
          placeholder="Email"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value.toLowerCase().trim())
          }
        />
        <div className="password-container">
          <label className="offscreen" htmlFor="password">
            Password
          </label>
          <input
            autoComplete="off"
            className={
              password.length > 0
                ? passwordRegex.test(password)
                  ? "input"
                  : "input error-input"
                : "input"
            }
            type={showPassword ? "text" : "password"}
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value.trim())
            }
          />
          <div
            className="eye-container"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoEyeOff /> : <IoEye />}
          </div>
        </div>
        <div className="confirm-password-container">
          <label className="offscreen" htmlFor="confirmPassword">
            Confirm your password
          </label>
          <input
            autoComplete="off"
            className={
              confirmPassword.length > 0
                ? confirmPassword === password
                  ? "input"
                  : "input input-error"
                : "input"
            }
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value.trim())
            }
          />
          <div
            className="eye-container"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
          </div>
        </div>
        <p className="error-text">{inputError && inputError}</p>
        <button
          type="submit"
          className="btn1"
          onClick={(e: FormEvent) => handleSubmit(e)}
          disabled={isValid ? false : true}
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default CreateAccount;
