import { ChangeEvent, FormEvent, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

type propsType = {
  setDisplay: React.Dispatch<
    React.SetStateAction<"account" | "login" | "password" | "home" | "security">
  >;
};

const LoginPage = ({ setDisplay }: propsType) => {
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
      <label className="offscreen" htmlFor="username">
        Username
      </label>
      <input
        className="input"
        type="text"
        id="username"
        placeholder="Username"
        value={username}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setUsername(e.target.value)
        }
        required
      />
      <label className="offscreen" htmlFor="password">
        Password
      </label>
      <input
        className="input"
        type={showPassword ? "text" : "password"}
        id="password"
        placeholder="Password"
        value={password}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        required
      />
      <div
        className="eye-container eye-login"
        onClick={() => setShowPasseord(!showPassword)}
      >
        {showPassword ? <IoEyeOff /> : <IoEye />}
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
        <input
          className="btn1"
          type="submit"
          value="Login"
          onSubmit={(e: FormEvent) => HandleSubmit(e)}
        />
      </div>
    </form>
  );
};

export default LoginPage;
