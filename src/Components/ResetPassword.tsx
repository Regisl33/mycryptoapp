import { ChangeEvent, FormEvent, useState } from "react";
import { propsTypeSetDisplay } from "../Types/LandingTypes";
import { IoEye, IoEyeOff } from "react-icons/io5";

const ResetPassword = ({ setDisplay }: propsTypeSetDisplay) => {
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
    <div className="main">
      <p>
        Your password has been reset!
        <u className="hot-Link" onClick={() => setDisplay("login")}>
          Click here to login
        </u>
      </p>
    </div>
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
