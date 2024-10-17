//Import Dependencies
import { ChangeEvent, useEffect, useState } from "react";
//Import Fetch User Hook
import { useGetAllUsersQuery } from "../../Features/LandingPage/UserSlice";
//Props Type for the controled input and handling the validity of the input
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
  //Error State for the input
  const [inputError, setInputError] = useState("");
  //Getting the Data from the User DataBase
  const { data: userApiData, error, isError } = useGetAllUsersQuery("User");
  //Define Username Regex Pattern
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  //This function is called by the handleUsernameChange function and handle the error message and the Regex Pattern Verification. It receives the username input value and the isUnique test variable that contain the result of the test for the current input value.
  const handleErrorMessage = (value: string, isUnique: boolean) => {
    //Checks if the username is Unique and sets the error message if it is not
    if (isUnique) {
      //Checks if the username match the Regex Pattern, if it does, set the validity of the input to true and remove any error message, if not sets the error message accordingly.
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
  //Function that set the username State to the input value and verify if the entry is valid
  const handleChangeUsername = (e: ChangeEvent<HTMLInputElement>) => {
    //Reset the unique value tester
    let isUnique = true;
    //Set the Username to the trimmed and Lowercased value of the input
    setUsername(e.target.value.toLowerCase().trim());
    //TypeScript security test to make sure both value exist before testing them
    if (e.target.value.toLowerCase().trim().length > 0 && userApiData?.ids) {
      //Testing if there is an existing user in the database
      if (userApiData.ids.length > 0) {
        //Map the existing user to make sure the username is unique
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
    //Calls HandleError and passes the current input value trimmed and lowercased and the unique test variable
    handleErrorMessage(e.target.value.toLowerCase().trim(), isUnique);
  };
  //This useEffect checks if we are able to get the user data, and sets the error if we can't
  useEffect(() => {
    if (isError) {
      setInputError("Could't Reach the server try again!");
      console.log(error);
    } else {
      setInputError("");
    }
  }, [isError, error]);
  //Username Controlled input HTML return
  const CreateUsernameInput = (
    <>
      {/* offscreen class makes the label not visible on the page but still visible for google robots */}
      <label className="offscreen" htmlFor="username">
        Username
      </label>
      <input
        autoComplete="off"
        // the classname handle the error display on the input
        className={
          usernameValid || username.length === 0 ? "input" : "error-input input"
        }
        type="text"
        id="username"
        placeholder="Username"
        value={username}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeUsername(e)}
      />
      {/* Display the error message if there is one */}
      <p className="error-text">
        {usernameValid || username.length === 0 ? "" : inputError}
      </p>
    </>
  );
  return CreateUsernameInput;
};

export default CreateUsername;
