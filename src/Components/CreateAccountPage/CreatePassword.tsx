import { ChangeEvent, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

type Create_Password_Props_Type = {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  passwordValid: boolean;
  setPasswordValid: React.Dispatch<React.SetStateAction<boolean>>;
};

const Create_Password = ({
  password,
  setPassword,
  passwordValid,
  setPasswordValid,
}: Create_Password_Props_Type) => {
  const [showPassword, setShowPassword] = useState(false);
  const passwordRegex = new RegExp(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  );

  const handle_Change_Password = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value.trim());
    if (e.target.value.trim().length > 0) {
      passwordRegex.test(e.target.value.trim())
        ? setPasswordValid(true)
        : setPasswordValid(false);
    } else {
      setPasswordValid(false);
    }
  };

  const Create_Password_Input = (
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
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handle_Change_Password(e)
        }
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

  return Create_Password_Input;
};

export default Create_Password;
