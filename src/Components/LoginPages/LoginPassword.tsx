import { ChangeEvent, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

type propsType = {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

const LoginPassword = ({ password, setPassword }: propsType) => {
  const [showPassword, setShowPasseord] = useState(false);

  const PasswordInput = (
    <div className="password-container">
      <label className="offscreen" htmlFor="password">
        Password
      </label>
      <input
        autoComplete="off"
        className="input"
        type={showPassword ? "text" : "password"}
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value.trim())
        }
      />
      <div
        className="eye-container"
        onClick={() => setShowPasseord(!showPassword)}
      >
        {showPassword ? <IoEyeOff /> : <IoEye />}
      </div>
    </div>
  );
  return PasswordInput;
};

export default LoginPassword;
