//Import Dependencies
import { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
//Import Fetch User Hook
import { useGetAllUsersQuery } from "../../Features/LandingPage/UserSlice";
//PropsType to set the userID for the password Reset
type forgotPasswordPropsType = {
  setCurrentID: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const ForgotPassword = ({ setCurrentID }: forgotPasswordPropsType) => {
  //Input Value State
  const [inputValue, setInputValue] = useState("");
  //Error State
  const [errorMessage, setErrorMessage] = useState("");
  //Define Navigate
  const navigate = useNavigate();
  //Getting the Data from the User DataBase
  const { data: userApiData, error, isError } = useGetAllUsersQuery("User");
  //Username and Email Regex Pattern
  const usernameRegex = /^[a-zA-Z0-9]+$/;
  const emailRegex = new RegExp(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  //Submit Function, it checks if the value entered is a username or an Email, than it checks if the username or Email is found in the database. If so it set it as the current ID, if not it sets the error message accordingly
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    //Email Tester
    let emailMatch: boolean = false;
    //Username Tester
    let userMatch: boolean = false;
    //Current Account ID
    let accountID: string | null = null;
    //Typescript security Check to see is we got the data before testing it, set the error message if we didn't get the data
    if (!isError && userApiData?.ids) {
      //Test if the input is an Email?
      emailRegex.test(inputValue)
        ? (emailMatch = true)
        : //Test if the input is a Username?
        usernameRegex.test(inputValue)
        ? (userMatch = true)
        : setErrorMessage("Please enter a valid Email or Username");
      //If the input is an Email, Checks if it match an account in the database
      if (emailMatch) {
        userApiData.ids.map((emailID) =>
          userApiData.entities[emailID].email === inputValue
            ? (accountID = emailID)
            : null
        );
        //If the input is a Username, Checks if it match an account in the database
      } else if (userMatch) {
        userApiData.ids.map((userID) =>
          userApiData.entities[userID].username === inputValue
            ? (accountID = userID)
            : null
        );
      }
      //Check if there was a match, if so clear any error message, set the current ID to the accountID and Navigate to de security-verification Page. If there was no match, display the error accordingly.
      if (accountID) {
        setErrorMessage("");
        setCurrentID(accountID);
        navigate("/security-verification");
      } else {
        setErrorMessage("We couldn't find your account");
      }
    } else {
      setErrorMessage("Sorry, we couldn't reach the server, please try again");
      console.log(error);
    }
  };
  //Submit Button, is disable a long as the input is empty, and calls the submit function
  const SubmitButton = (
    <button
      type="submit"
      className="btn1"
      disabled={inputValue.length > 0 ? false : true}
      onClick={(e: FormEvent) => handleSubmit(e)}
    >
      Continue
    </button>
  );
  //Forgot Password Page HTML Return, Class Main handle the background, Class form-container handle the display
  const forgotPasswordPage = (
    <form className="main">
      <div className="form-container">
        {/* offscreen class makes the label not visible on the page but still visible for google robots */}
        <label className="offscreen" htmlFor="passwordReset">
          Enter your Username or Email adress
        </label>
        {/* return a controled input */}
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
        {/* Display the error message if there is one */}
        <p className="error-text">{errorMessage}</p>
        {SubmitButton}
      </div>
    </form>
  );

  return forgotPasswordPage;
};

export default ForgotPassword;
