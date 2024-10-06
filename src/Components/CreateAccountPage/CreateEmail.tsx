import { ChangeEvent, useState, useEffect } from "react";
import { useGetAllUsersQuery } from "../../Features/LandingPage/UserSlice";

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
  const [inputError, setInputError] = useState("");
  const { data: userApiData, error, isError } = useGetAllUsersQuery("User");
  const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

  const handleErrorMessage = (value: string, isUnique: boolean) => {
    if (isUnique) {
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

  const handleChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
    let isUnique = true;
    setEmail(e.target.value.toLowerCase().trim());
    if (e.target.value.toLowerCase().trim().length > 0) {
      if (userApiData?.ids) {
        if (userApiData?.ids.length > 0) {
          userApiData.ids.map((id) =>
            userApiData.entities[id].email ===
            e.target.value.toLowerCase().trim()
              ? (isUnique = false)
              : null
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

  const CreateEmailInput = (
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
        onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeEmail(e)}
      />
      <p className="error-text">
        {emailValid || email.length === 0 ? "" : inputError}
      </p>
    </>
  );

  return CreateEmailInput;
};

export default CreateEmail;
