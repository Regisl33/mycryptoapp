import { ChangeEvent, useState, useEffect } from "react";
import { useGetAllUsersQuery } from "../../Features/LandingPage/UserSlice";

type Create_Email_Props_Type = {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  emailValid: boolean;
  setEmailValid: React.Dispatch<React.SetStateAction<boolean>>;
};

const Create_Email = ({
  email,
  setEmail,
  emailValid,
  setEmailValid,
}: Create_Email_Props_Type) => {
  const [inputError, setInputError] = useState("");
  const { data: userApiData, error, isError } = useGetAllUsersQuery("User");
  const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

  const addErrorMessage = (value: string) => {
    setEmailValid(false);
    if (emailRegex.test(value)) {
      setInputError("This E-Mail Adress is already link to an account");
    } else {
      setInputError("Please Enter a Valid E-Mail Adress");
    }
  };

  const removeErrorMessage = () => {
    setEmailValid(true);
    setInputError("");
  };

  const handle_Change_Email = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.toLowerCase().trim());
    if (e.target.value.toLowerCase().trim().length > 0) {
      if (userApiData?.ids) {
        if (userApiData?.ids.length > 0) {
          userApiData.ids.map((id) =>
            userApiData.entities[id].email ===
            e.target.value.toLowerCase().trim()
              ? addErrorMessage(e.target.value.toLowerCase().trim())
              : emailRegex.test(e.target.value.toLowerCase().trim())
              ? removeErrorMessage()
              : addErrorMessage(e.target.value.toLowerCase().trim())
          );
        } else {
          setEmailValid(true);
        }
      } else {
        setEmailValid(false);
      }
    } else {
      setEmailValid(false);
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

  const Create_Email_Input = (
    <>
      <label className="offscreen" htmlFor="email">
        Email
      </label>
      <input
        autoComplete="off"
        className={
          emailValid || email.length === 0 ? "input" : "error-input input"
        }
        type="text"
        id="email"
        placeholder="Email"
        value={email}
        onChange={(e: ChangeEvent<HTMLInputElement>) => handle_Change_Email(e)}
      />
      <p className="error-text">
        {emailValid || email.length === 0 ? "" : inputError}
      </p>
    </>
  );

  return Create_Email_Input;
};

export default Create_Email;
