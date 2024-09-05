import { ChangeEvent, FormEvent, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

type propsType = {
  setDisplay: React.Dispatch<
    React.SetStateAction<"account" | "login" | "password" | "home" | "security">
  >;
};

const CreateAccount = ({ setDisplay }: propsType) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDisplay("security");
  };

  return (
    <form className="main create-form">
      <div className="form-container">
        <h2>Enter your information to create your account</h2>
        <label className="offscreen" htmlFor="username">
          Username
        </label>
        <input
          autoComplete="off"
          className="input"
          type="text"
          id="username"
          placeholder="Username"
          required
          value={username}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setUsername(e.target.value)
          }
        />
        <label className="offscreen" htmlFor="email">
          Email
        </label>
        <input
          autoComplete="off"
          className="input"
          type="text"
          id="email"
          placeholder="Email"
          required
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
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
            required
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
          <label className="offscreen" htmlFor="confirmPassword">
            Confirm your password
          </label>
          <input
            autoComplete="off"
            className="input"
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            placeholder="Confirm your password"
            required
            value={confirmPassword}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setConfirmPassword(e.target.value)
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
          Next
        </button>
      </div>
    </form>
  );
};

export default CreateAccount;
