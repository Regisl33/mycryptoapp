//Import Dependencies
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";
//Import GetUser et PasswordMutation Redux Function
import {
  useGetAllUsersQuery,
  usePasswordResetMutation,
} from "../../Features/LandingPage/UserSlice";
//Import Controlled Input Components and Handle Return Login Components
import HandleReturnLogin from "../CreateAccountPage/HandleReturnLogin";
import ResetPasswordInput from "./ResetPasswordInput";
import ResetConfirmInput from "./ResetConfirmInput";
//Import Types for password Reset and CurrentID Props
import {
  currentIDPropsType,
  passwordChangeType,
} from "../../Types/LandingTypes";

const ResetPassword = ({ currentID }: currentIDPropsType) => {
  //Controlled Input State
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  //Error State
  const [errorMessage, setErrorMessage] = useState("");
  //This State Checks if the form is Submitted
  const [isSubmited, setIsSubmited] = useState(false);
  //Get User Data from Redux Store
  const { data: userApiData, error, isError } = useGetAllUsersQuery("User");
  //Define Password Reset Mutation
  const [passwordReset] = usePasswordResetMutation();
  //Define Navigate
  const navigate = useNavigate();
  //Define Password History Object and the New Password and Try to Update the Redux Store. If it can't catch and log the error
  const handleReset = async (
    oldPassword: string,
    password: string,
    id: number
  ) => {
    let passwordHistory: passwordChangeType = {
      oldPassword,
      resetDate: Date.now(),
    };
    let passwordHistoryData = {
      passwordChange: {
        password,
        passwordHistory,
      },
      id,
    };
    try {
      await passwordReset(passwordHistoryData).unwrap();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (userApiData?.entities && currentID) {
      if (userApiData.entities[currentID].passwordHistory) {
        if (
          userApiData.entities[currentID].passwordHistory?.oldPassword ===
            password ||
          userApiData.entities[currentID].password === password
        ) {
          setErrorMessage(
            "You must use different password then the last 2 passwords you've used"
          );
        } else {
          await handleReset(
            userApiData.entities[currentID].password,
            password,
            currentID
          );
          setIsSubmited(true);
        }
      } else if (userApiData.entities[currentID].password === password) {
        setErrorMessage(
          "You must use different password then the last 2 passwords you've used"
        );
      } else {
        await handleReset(
          userApiData.entities[currentID].password,
          password,
          currentID
        );
        setIsSubmited(true);
      }
    } else {
      console.log(
        "This Error Should Never Occur Due To Previous Verification But if it Does it because we couldn't get Api Data or the user ID"
      );
    }
  };

  useEffect(() => {
    if (!currentID) {
      navigate("/login");
    }
    if (isError) {
      setErrorMessage("We couldn't reach the server");
      console.log(error);
    }
  }, []);

  const content = isSubmited ? (
    <HandleReturnLogin text="Your password has been reset!" />
  ) : (
    <form className="main">
      <div className="form-container">
        <h2 className="password-reset-title title">Enter your new password</h2>
        <ResetPasswordInput
          password={password}
          passwordConfirm={passwordConfirm}
          setErrorMessage={setErrorMessage}
          setPassword={setPassword}
        />
        <ResetConfirmInput
          password={password}
          passwordConfirm={passwordConfirm}
          setErrorMessage={setErrorMessage}
          setPasswordConfirm={setPasswordConfirm}
        />

        <p className="error-text">{errorMessage}</p>
        <button
          type="submit"
          className="btn1"
          onClick={(e: FormEvent) => handleSubmit(e)}
          disabled={
            errorMessage.length === 0 &&
            password.length > 0 &&
            passwordConfirm.length > 0
              ? false
              : true
          }
        >
          Reset your password
        </button>
      </div>
    </form>
  );

  return content;
};

export default ResetPassword;
