import { ChangeEvent, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPasseord] = useState(false);

  return (
    <main>
      <form>
        <h1>Welcome to your crypto-app</h1>
        <div className="input-container">
          <label className="offscreen" htmlFor="username">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
          <label className="offscreen" htmlFor="password">
            Password
          </label>
          <input
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
          <input type="submit" value="Login" />
          <a href="#">Forgot password</a>
        </div>
      </form>
    </main>
  );
};

export default LoginPage;
