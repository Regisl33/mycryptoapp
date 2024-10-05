import { ChangeEvent, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

type CreatePasswordPropsType = {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordValid: boolean;
  setPasswordValid: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreatePassword = ({
  password,
  setPassword,
  passwordValid,
  setPasswordValid,
}: CreatePasswordPropsType) => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordRegex = new RegExp(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  );

  const handleChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim());
    if (e.target.value.trim().length > 0) {
      passwordRegex.test(e.target.value.trim())
        ? setPasswordValid(true)
        : setPasswordValid(false);
    } else {
      setPasswordValid(false);
    }
  };

  const CreatePasswordInput = (
    <div className="password-container">
      <label className="offscreen" htmlFor="password">
        Password
      </label>
      <input
        autoComplete="off"
        className={
          passwordValid || password.length === 0 ? "input" : "error-input input"
        }
        type={showPassword ? "text" : "password"}
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangePassword(e)}
      />
      <div
        className="eye-container"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <IoEyeOff /> : <IoEye />}
      </div>
      <p className="error-text">
        {passwordValid || password.length === 0
          ? ""
          : "Your password must be at least 8 character, have a capital letter, a number and a special character"}
      </p>
    </div>
  );

  return CreatePasswordInput;
};

export default CreatePassword;
