import { ChangeEvent, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

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
  const [showPassword, setShowPassword] = useState(false);

  const handleConfirmChange = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value.trim());
  };

  const confirmPasswordInput = (
    <div className="confirm-password-container">
      <label className="offscreen" htmlFor="confirmPassword">
        Confirm your password
      </label>
      <input
        autoComplete="off"
        className={
          confirmPassword.length > 0 && confirmPassword !== password
            ? "error-input input"
            : "input"
        }
        type={showPassword ? "text" : "password"}
        id="confirmPassword"
        placeholder="Confirm your password"
        value={confirmPassword}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmChange(e)}
      />
      <div
        className="eye-container"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <IoEyeOff /> : <IoEye />}
      </div>
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
