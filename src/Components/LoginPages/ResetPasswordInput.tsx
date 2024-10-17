//Import Dependencies
import { useState, ChangeEvent } from "react";
//Import Eye Icons
import { IoEye, IoEyeOff } from "react-icons/io5";
//Props Type, need the password and the confirm password for verification, need to set the password and the error message
type resetPasswordPropsType = {
  password: string;
  passwordConfirm: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

const ResetPasswordInput = ({
  password,
  passwordConfirm,
  setPassword,
  setErrorMessage,
}: resetPasswordPropsType) => {
  //Show Password State, can be modified by clicking on the eye icon.
  const [showPassword, setShowPassword] = useState(false);
  //Password Regex Pattern
  const passwordRegex = new RegExp(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  );
  //Function that set the new password everytime the password input changes, it receive the input value, and validate if the password is valid and set the error message accordingly.
  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (passwordRegex.test(value) || password.length === 0) {
      setErrorMessage("");
    } else if (password !== passwordConfirm && passwordConfirm.length > 0) {
      setErrorMessage("Your Password confirmation doesn't match your password");
    } else {
      setErrorMessage(
        "Your password must be at least 8 character, have a capital letter, a number and a special character"
      );
    }
  };
  //Return a controlled Input
  const resetPasswordInput = (
    <div className="password-container">
      {/* offscreen class makes the label not visible on the page but still visible for google robots */}
      <label className="offscreen" htmlFor="resetPassword">
        Enter your password
      </label>
      <input
        type={showPassword ? "text" : "password"}
        className="input"
        id="resetPassword"
        autoComplete="off"
        placeholder="Enter your new password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handlePasswordChange(e.target.value)
        }
      />
      {/* eye-icon display logic */}
      <div
        className="eye-container"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <IoEyeOff /> : <IoEye />}
      </div>
    </div>
  );

  return resetPasswordInput;
};

export default ResetPasswordInput;
