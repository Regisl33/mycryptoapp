//Import Dependencies
import { ChangeEvent, useState } from "react";
//Import Eye Icons
import { IoEye, IoEyeOff } from "react-icons/io5";
//Props Type for the controled Input
type loginPasswordPropsType = {
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
};

const LoginPassword = ({ password, setPassword }: loginPasswordPropsType) => {
  //Show Password State, can be modified by clicking on the eye icon.
  const [showPassword, setShowPasseord] = useState(false);
  //Return a controlled Input
  const PasswordInput = (
    <div className="password-container">
      {/* offscreen class makes the label not visible on the page but still visible for google robots */}
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
      {/* eye-icon display logic */}
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
