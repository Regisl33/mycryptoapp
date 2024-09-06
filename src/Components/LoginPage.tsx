import { ChangeEvent, FormEvent, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

export type propsTypeSetDisplay = {
  setDisplay: React.Dispatch<
    React.SetStateAction<
      | "account"
      | "login"
      | "password"
      | "home"
      | "security"
      | "verification"
      | "reset"
    >
  >;
};

const LoginPage = ({ setDisplay }: propsTypeSetDisplay) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPasseord] = useState(false);
  const [memorizeUser, setMemorizeUser] = useState(false);

  const HandleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (memorizeUser) {
      //Cookies
    }
  };

  return (
    <form className="main login-form">
      <div className="form-container">
        <label className="offscreen" htmlFor="username">
          Username
        </label>
        <input
          autoComplete="off"
          className="input"
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
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
              setPassword(e.target.value)
            }
          />
          <div
            className="eye-container"
            onClick={() => setShowPasseord(!showPassword)}
          >
            {showPassword ? <IoEyeOff /> : <IoEye />}
          </div>
        </div>
        <div className="btn-container">
          <div className="memorized-user">
            <label htmlFor="memUser">Remember Me</label>
            <input
              type="checkbox"
              id="memUser"
              checked={memorizeUser ? true : false}
              onClick={() => setMemorizeUser(!memorizeUser)}
            />
          </div>
          <button className="btn2" onClick={() => setDisplay("password")}>
            Forgot Password
          </button>
          <button
            className="btn1"
            type="submit"
            onSubmit={(e: FormEvent) => HandleSubmit(e)}
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
};

export default LoginPage;
