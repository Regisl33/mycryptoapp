import { useState, ChangeEvent } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

type propsType = {
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
}: propsType) => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordRegex = new RegExp(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  );

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

  return (
    <div className="password-container">
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
      <div
        className="eye-container"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <IoEyeOff /> : <IoEye />}
      </div>
    </div>
  );
};

export default ResetPasswordInput;
