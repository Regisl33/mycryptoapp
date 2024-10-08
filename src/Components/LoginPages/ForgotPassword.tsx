import { ChangeEvent, FormEvent, useState } from "react";
import { useGetAllUsersQuery } from "../../Features/LandingPage/UserSlice";
import { useNavigate } from "react-router-dom";

type propsType = {
  setCurrentID: React.Dispatch<React.SetStateAction<number | undefined>>;
};

const ForgotPassword = ({ setCurrentID }: propsType) => {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const { data: userApiData, error, isError } = useGetAllUsersQuery("User");

  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let emailMatch: boolean = false;
    let userMatch: boolean = false;
    let accountID: number | null = null;
    if (!isError) {
      if (userApiData?.ids) {
        emailRegex.test(inputValue)
          ? (emailMatch = true)
          : usernameRegex.test(inputValue)
          ? (userMatch = true)
          : setErrorMessage("Please enter a valid Email or Username");

        if (emailMatch) {
          userApiData.ids.map((emailID) =>
            userApiData.entities[emailID].email === inputValue
              ? (accountID = emailID)
              : null
          );
        } else if (userMatch) {
          userApiData.ids.map((userID) =>
            userApiData.entities[userID].username === inputValue
              ? (accountID = userID)
              : null
          );
        }

        if (accountID) {
          setErrorMessage("");
          setCurrentID(accountID);
          navigate("/security-verification");
        } else {
          setErrorMessage("We couldn't find your account");
        }
      } else {
        setErrorMessage(
          "Sorry, we couldn't reach the server, please try again"
        );
      }
    } else {
      setErrorMessage("Sorry, we couldn't reach the server, please try again");
      console.log(error);
    }
  };

  const content = (
    <form className="main">
      <div className="form-container">
        <label className="offscreen" htmlFor="passwordReset">
          Enter your Username or Email adress
        </label>
        <input
          className="input"
          autoComplete="off"
          type="text"
          id="passwordReset"
          placeholder="Enter your Username or Email adress"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value.toLowerCase().trim())
          }
        />
        <p className="error-text">{errorMessage}</p>
        <button
          type="submit"
          className="btn1"
          disabled={inputValue.length > 0 ? false : true}
          onClick={(e: FormEvent) => handleSubmit(e)}
        >
          Send
        </button>
      </div>
    </form>
  );

  return content;
};

export default ForgotPassword;
