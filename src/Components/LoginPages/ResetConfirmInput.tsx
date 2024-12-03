//Import Dependencies
import { useState, ChangeEvent } from "react";
//Import Eye Icons
import { IoEye, IoEyeOff } from "react-icons/io5";
//Props Type, need the password and the confirm password for verification, need to set the confirm password and the error message
type propsType = {
  password: string;
  passwordConfirm: string;
  setPasswordConfirm: React.Dispatch<React.SetStateAction<string>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
};

const ResetConfirmInput = ({
  password,
  passwordConfirm,
  setErrorMessage,
  setPasswordConfirm,
}: propsType) => {
  //Show Password State, can be modified by clicking on the eye icon.
  const [showPassword, setShowPassword] = useState(false);
  //Function that set the new confirm password everytime the confirm password input changes, it receive the input value, and validate if the password is valid and set the error message accordingly.
  const handleConfirmChange = (value: string) => {
    setPasswordConfirm(value);
    if (password.length === 0 || value.length === 0 || password === value) {
      setErrorMessage("");
    } else {
      setErrorMessage("Your Password confirmation doesn't match your password");
    }
  };
  //Return a controlled Input
  const resetConfirmInput = (
    <div className="confirm-password-container">
      {/* offscreen class makes the label not visible on the page but still visible for google robots */}
      <label className="offscreen" htmlFor="resetPasswordConfirm">
        Confirm your password
      </label>
      <input
        type={showPassword ? "text" : "password"}
        className="input"
        id="resetPasswordConfirm"
        autoComplete="off"
        placeholder="Confirm your password"
        value={passwordConfirm}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handleConfirmChange(e.target.value)
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

  return resetConfirmInput;
};

export default ResetConfirmInput;
