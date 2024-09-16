import { ChangeEvent, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

type Create_Confirm_Password_Props_Type = {
  confirmPassword: string;
  password: string;
  setConfirmPassword: React.Dispatch<React.SetStateAction<string>>;
};

const Create_Confirm_Password = ({
  confirmPassword,
  password,
  setConfirmPassword,
}: Create_Confirm_Password_Props_Type) => {
  const [showPassword, setShowPassword] = useState(false);

  const handle_Confirm_Change = (e: ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(e.target.value.trim());
  };

  return (
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
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handle_Confirm_Change(e)
        }
      />
      <div
        className="eye-container"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <IoEyeOff /> : <IoEye />}
      </div>
      <p className="error-text">
        {confirmPassword === password
          ? ""
          : "Your Password confirmation doesn't match your password"}
      </p>
    </div>
  );
};

export default Create_Confirm_Password;
