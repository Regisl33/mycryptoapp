//Import Dependencies
import { ChangeEvent, useState } from "react";
//Import Eye Icons
import { IoEye, IoEyeOff } from "react-icons/io5";
//Props Type for the controled input and handling the validity of the input
type CreatePasswordPropsType = {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordValid: boolean;
  setPasswordValid: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreatePassword = ({
  password,
  setPassword,
  passwordValid,
  setPasswordValid,
}: CreatePasswordPropsType) => {
  //Show Password State, can be modified by clicking on the eye icon.
  const [showPassword, setShowPassword] = useState(false);
  //Password Regex Pattern
  const passwordRegex = new RegExp(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  );
  //Function that set the new password everytime the password input changes, it receive the input value, and validate if the password is matching is Regex pattern.
  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim());
    if (e.target.value.trim().length > 0) {
      passwordRegex.test(e.target.value.trim())
        ? setPasswordValid(true)
        : setPasswordValid(false);
    } else {
      setPasswordValid(false);
    }
  };
  //Return a controlled Input
  const CreatePasswordInput = (
    <div className="password-container">
      {/* offscreen class makes the label not visible on the page but still visible for google robots */}
      <label className="offscreen" htmlFor="password">
        Password
      </label>
      <input
        autoComplete="off"
        // the classname handle the error display on the input
        className={
          passwordValid || password.length === 0 ? "input" : "error-input input"
        }
        type={showPassword ? "text" : "password"}
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangePassword(e)}
      />
      {/* eye-icon display logic */}
      <div
        className="eye-container"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <IoEyeOff /> : <IoEye />}
      </div>
      {/* Display the error message if there is one */}
      <p className="error-text">
        {passwordValid || password.length === 0
          ? ""
          : "Your password must be at least 8 character, have a capital letter, a number and a special character"}
      </p>
    </div>
  );

  return CreatePasswordInput;
};

export default CreatePassword;
