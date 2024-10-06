import { ChangeEvent, useEffect, useState } from "react";
import { useGetAllUsersQuery } from "../../Features/LandingPage/UserSlice";

type CreateUsernamePropsType = {
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  usernameValid: boolean;
  setUsernameValid: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateUsername = ({
  username,
  setUsername,
  usernameValid,
  setUsernameValid,
}: CreateUsernamePropsType) => {
  const { data: userApiData, error, isError } = useGetAllUsersQuery("User");
  const [inputError, setInputError] = useState("");

  const usernameRegex = /^[a-zA-Z0-9]+$/;

  const handleErrorMessage = (value: string, isUnique: boolean) => {
    if (isUnique) {
      if (usernameRegex.test(value)) {
        setUsernameValid(true);
        setInputError("");
      } else {
        setInputError("Username can only contain alphanumeric characters");
        setUsernameValid(false);
      }
    } else {
      setInputError("This username already exist");
      setUsernameValid(false);
    }
  };

  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    let isUnique = true;
    setUsername(e.target.value.toLowerCase().trim());
    if (e.target.value.toLowerCase().trim().length > 0) {
      if (userApiData?.ids) {
        if (userApiData.ids.length > 0) {
          userApiData.ids.map((id) =>
            userApiData.entities[id].username ===
            e.target.value.toLowerCase().trim()
              ? (isUnique = false)
              : null
          );
        } else {
          setUsernameValid(true);
        }
      } else {
        setUsernameValid(false);
      }
    } else {
      setUsernameValid(false);
    }
    handleErrorMessage(e.target.value.toLowerCase().trim(), isUnique);
  };

  useEffect(() => {
    if (isError) {
      setInputError("Could't Reach the server try again!");
      console.log(error);
    } else {
      setInputError("");
    }
  }, [isError, error]);

  const CreateUsernameInput = (
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
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeUsername(e)}
      />
      <p className="error-text">
        {usernameValid || username.length === 0 ? "" : inputError}
      </p>
    </>
  );
  return CreateUsernameInput;
};

export default CreateUsername;
