import { ChangeEvent } from "react";

type propsType = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

const LoginUsername = ({ username, setUsername }: propsType) => {
  const UsernameInput = (
    <>
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
          setUsername(e.target.value.toLowerCase().trim())
        }
      />
    </>
  );
  return UsernameInput;
};

export default LoginUsername;
