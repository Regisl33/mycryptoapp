import { useState, ChangeEvent } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

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
  const [showPassword, setShowPassword] = useState(false);

  const handleConfirmChange = (value: string) => {
    setPasswordConfirm(value);
    if (
      password.length === 0 ||
      passwordConfirm.length === 0 ||
      password === value
    ) {
      setErrorMessage("");
    } else {
      setErrorMessage("Your Password confirmation doesn't match your password");
    }
  };

  return (
    <div className="confirm-password-container">
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
      <div
        className="eye-container"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <IoEyeOff /> : <IoEye />}
      </div>
    </div>
  );
};

export default ResetConfirmInput;
