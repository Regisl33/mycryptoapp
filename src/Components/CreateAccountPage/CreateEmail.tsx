//Import Dependencies
import { ChangeEvent, useState, useEffect } from "react";
//Import Fetch User Hook
import { useGetAllUsersQuery } from "../../Features/LandingPage/UserSlice";
//Props Type for the controled input and handling the validity of the input
type CreateEmailPropsType = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  emailValid: boolean;
  setEmailValid: React.Dispatch<React.SetStateAction<boolean>>;
};

const CreateEmail = ({
  email,
  setEmail,
  emailValid,
  setEmailValid,
}: CreateEmailPropsType) => {
  //Error State for the input
  const [inputError, setInputError] = useState("");
  //Getting the Data from the User DataBase
  const { data: userApiData, error, isError } = useGetAllUsersQuery("User");
  //Define Email Regex Pattern
  const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);
  //This function is called by the handleEmailChange function and handle the error message and the Regex Pattern Verification. It receives the email input value and the isUnique test variable that contain the result of the test for the current input value.
  const handleErrorMessage = (value: string, isUnique: boolean) => {
    //Checks if the email is Unique and sets the error message if it is not
    if (isUnique) {
      //Checks if the email match the Regex Pattern, if it does, set the validity of the input to true and remove any error message, if not sets the error message accordingly.
      if (emailRegex.test(value)) {
        setEmailValid(true);
        setInputError("");
      } else {
        setInputError("Please Enter a Valid Email Adress");
        setEmailValid(false);
      }
    } else {
      setInputError("This email is already linked to an account");
      setEmailValid(false);
    }
  };
  //Function that set the email State to the input value and verify if the entry is valid
  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    //Reset the unique value tester
    let isUnique = true;
    //Set the Username to the trimmed and Lowercased value of the input
    setEmail(e.target.value.toLowerCase().trim());
    //TypeScript security test to make sure both value exist before testing them
    if (e.target.value.toLowerCase().trim().length > 0 && userApiData?.ids) {
      //Testing if there is an existing user in the database
      if (userApiData?.ids.length > 0) {
        //Map the existing user to make sure the email is unique
        userApiData.ids.map((id) =>
          userApiData.entities[id].email === e.target.value.toLowerCase().trim()
            ? (isUnique = false)
            : null
        );
      } else {
        setEmailValid(true);
      }
    } else {
      setEmailValid(false);
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
  //Email Controlled input HTML return
  const CreateEmailInput = (
    <>
      {/* offscreen class makes the label not visible on the page but still visible for google robots */}
      <label className="offscreen" htmlFor="email">
        Email
      </label>
      <input
        autoComplete="off"
        // the classname handle the error display on the input
        className={
          emailValid || email.length === 0 ? "input" : "error-input input"
        }
        type="text"
        id="email"
        placeholder="Email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeEmail(e)}
      />
      {/* Display the error message if there is one */}
      <p className="error-text">
        {emailValid || email.length === 0 ? "" : inputError}
      </p>
    </>
  );

  return CreateEmailInput;
};

export default CreateEmail;
