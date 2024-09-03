import { ChangeEvent, FormEvent, useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
  };

  return (
    <form className="main">
      <label className="offscreen" htmlFor="username">
        Username
      </label>
      <input
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
        type="text"
        id="email"
        placeholder="Email"
        required
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
      />
      <label className="offscreen" htmlFor="password">
        Password
      </label>
      <input
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
        className="eye-container eye-password"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <IoEyeOff /> : <IoEye />}
      </div>
      <label className="offscreen" htmlFor="confirmPassword">
        Confirm your password
      </label>
      <input
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
        className="eye-container eye-confirm"
        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
      >
        {showConfirmPassword ? <IoEyeOff /> : <IoEye />}
      </div>
      <input
        type="submit"
        value="Create Account"
        onSubmit={(e: FormEvent<HTMLInputElement>) => handleSubmit(e)}
      />
    </form>
  );
};

export default CreateAccount;
