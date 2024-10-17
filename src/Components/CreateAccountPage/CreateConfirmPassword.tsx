//Import Dependencies
import { ChangeEvent, useState } from "react";
//Import Eye Icons
import { IoEye, IoEyeOff } from "react-icons/io5";
//Props Type for the controled input and handling the validity of the input and password to test if the confirm password is matching
type CreateConfirmPasswordPropsType = {
  confirmPassword: string;
  password: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
};

const CreateConfirmPassword = ({
  confirmPassword,
  password,
  setConfirmPassword,
}: CreateConfirmPasswordPropsType) => {
  //Show Password State, can be modified by clicking on the eye icon.
  const [showPassword, setShowPassword] = useState(false);
  //Return a controlled Input
  const confirmPasswordInput = (
    <div className="confirm-password-container">
      {/* offscreen class makes the label not visible on the page but still visible for google robots */}
      <label className="offscreen" htmlFor="confirmPassword">
        Confirm your password
      </label>
      <input
        autoComplete="off"
        // the classname handle the error display on the input
        className={
          confirmPassword.length > 0 && confirmPassword !== password
            ? "error-input input"
            : "input"
        }
        type={showPassword ? "text" : "password"}
        id="confirmPassword"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setConfirmPassword(e.target.value.trim())
        }
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
        {confirmPassword.length > 0 && confirmPassword !== password
          ? "Your Password confirmation doesn't match your password"
          : ""}
      </p>
    </div>
  );

  return confirmPasswordInput;
};

export default CreateConfirmPassword;
