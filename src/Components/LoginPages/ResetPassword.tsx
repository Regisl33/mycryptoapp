import { ChangeEvent, FormEvent, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import HandleReturnLogin from "../CreateAccountPage/HandleReturnLogin";

type propsType = {
  setDisplay: React.Dispatch<
    React.SetStateAction<
      | "password"
      | "account"
      | "login"
      | "home"
      | "security"
      | "verification"
      | "reset"
    >
  >;
  selectedID: number | undefined;
};

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmited(true);
  };

  const content = isSubmited ? (
    <HandleReturnLogin text="Your password has been reset!" />
  ) : (
    <form className="main">
      <div className="form-container">
        <h2 className="password-reset-title title">Enter your new password</h2>
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
              setPassword(e.target.value)
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
          <label className="offscreen" htmlFor="resetPasswordConfirm">
            Confirm your password
          </label>
          <input
            type={showConfirmPassword ? "text" : "password"}
            className="input"
            id="resetPasswordConfirm"
            autoComplete="off"
            placeholder="Confirm your password"
            value={passwordConfirm}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPasswordConfirm(e.target.value)
            }
          />
          <div
            className="eye-container"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
          </div>
        </div>
        <button
          type="submit"
          className="btn1"
          onClick={(e: FormEvent) => handleSubmit(e)}
        >
          Reset your password
        </button>
      </div>
    </form>
  );

  return content;
};

export default ResetPassword;
