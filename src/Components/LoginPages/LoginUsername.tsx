//Import Dependencies
import { ChangeEvent } from "react";
//Props Type for the controled Input
type loginUsernamePropsType = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
};

const LoginUsername = ({ username, setUsername }: loginUsernamePropsType) => {
  //Return a controlled Input
  const UsernameInput = (
    <>
      {/* offscreen class makes the label not visible on the page but still visible for google robots */}
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
