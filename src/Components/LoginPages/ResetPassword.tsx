import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";
import HandleReturnLogin from "../CreateAccountPage/HandleReturnLogin";
import { useGetAllUsersQuery } from "../../Features/LandingPage/UserSlice";
import { currentIDPropsType } from "../../Types/AppTypes";
import { useNavigate } from "react-router";

const ResetPassword = ({ currentID }: currentIDPropsType) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { data: userApiData, error, isError } = useGetAllUsersQuery("User");

  const navigate = useNavigate();

  const passwordRegex = new RegExp(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  );

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    if (passwordRegex.test(value) || password.length === 0) {
      setErrorMessage("");
    } else {
      setErrorMessage(
        "Your password must be at least 8 character, have a capital letter, a number and a special character"
      );
    }
  };
  const handleConfirmChange = (value: string) => {
    setPasswordConfirm(value);
    if (
      password.length === 0 ||
      passwordConfirm.length === 0 ||
      password === passwordConfirm
    ) {
      setErrorMessage("");
    } else {
      setErrorMessage("Your Password confirmation doesn't match your password");
    }
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (userApiData?.entities && currentID) {
      if (userApiData.entities[currentID].passwordHistory) {
        if (
          userApiData.entities[currentID].passwordHistory?.oldPassword ||
          userApiData.entities[currentID].password === password
        ) {
          setErrorMessage(
            "You must use different password then the last 2 passwords you've used"
          );
        } else {
          setIsSubmited(true);
        }
      } else {
        setIsSubmited(true);
      }
    } else {
      console.log(
        "This Error Should Never Occur Due To Previous Verification But if it Does it because we couldn't get Api Data or the user ID"
      );
    }
  };

  useEffect(() => {
    if (!currentID) {
      navigate("/login");
    }
    if (isError) {
      setErrorMessage("We couldn't reach the server");
      console.log(error);
    }
  }, []);

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
              handleConfirmChange(e.target.value)
            }
          />
          <div
            className="eye-container"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
          </div>
        </div>
        <p className="error-text">{errorMessage}</p>
        <button
          type="submit"
          className="btn1"
          onClick={(e: FormEvent) => handleSubmit(e)}
          disabled={
            errorMessage.length === 0 &&
            password.length > 0 &&
            passwordConfirm.length > 0
              ? false
              : true
          }
        >
          Reset your password
        </button>
      </div>
    </form>
  );

  return content;
};

export default ResetPassword;
