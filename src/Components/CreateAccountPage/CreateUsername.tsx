import { ChangeEvent, useEffect, useState } from "react";
import { useGetAllUsersQuery } from "../../Features/LandingPage/UserSlice";

type Create_Username_Props_Type = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  usernameValid: boolean;
  setUsernameValid: React.Dispatch<React.SetStateAction<boolean>>;
};

const Create_Username = ({
  username,
  setUsername,
  usernameValid,
  setUsernameValid,
}: Create_Username_Props_Type) => {
  const { data: userApiData, error, isError } = useGetAllUsersQuery("User");
  const [inputError, setInputError] = useState("");

  const usernameRegex = /^[a-zA-Z0-9]+$/;

  const addErrorMessage = (value: string) => {
    setUsernameValid(false);
    if (usernameRegex.test(value)) {
      setInputError("This username already exist");
    } else {
      setInputError("Username can only contain alphanumeric characters");
    }
  };

  const removeErrorMessage = () => {
    setUsernameValid(true);
    setInputError("");
  };

  const handle_Change_Username = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value.toLowerCase().trim());
    if (e.target.value.toLowerCase().trim().length > 0) {
      if (userApiData?.ids) {
        if (userApiData.ids.length > 0) {
          userApiData.ids.map((id) =>
            userApiData.entities[id].username ===
            e.target.value.toLowerCase().trim()
              ? addErrorMessage(e.target.value.toLowerCase().trim())
              : usernameRegex.test(e.target.value.toLowerCase().trim())
              ? removeErrorMessage()
              : addErrorMessage(e.target.value.toLowerCase().trim())
          );
        } else {
          setUsernameValid(true);
        }
      }
    } else {
      setUsernameValid(false);
    }
  };

  useEffect(() => {
    if (isError) {
      setInputError("Could't Reach the server try again!");
      console.log(error);
    } else {
      setInputError("");
    }
  }, [isError]);

  const Create_Username_Input = (
    <>
      <label className="offscreen" htmlFor="username">
        Username
      </label>
      <input
        autoComplete="off"
        className={
          usernameValid || username.length === 0 ? "input" : "error-input input"
        }
        type="text"
        id="username"
        placeholder="Username"
        value={username}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          handle_Change_Username(e)
        }
      />
      <p className="error-text">
        {usernameValid || username.length === 0 ? "" : inputError}
      </p>
    </>
  );
  return Create_Username_Input;
};

export default Create_Username;
