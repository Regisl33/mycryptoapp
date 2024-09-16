import { ChangeEvent } from "react";

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
  const emailRegex = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g);

  const handle_Change_Email = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value.toLowerCase().trim());
    if (e.target.value.toLowerCase().trim().length > 0) {
      emailRegex.test(e.target.value.toLowerCase().trim())
        ? setEmailValid(true)
        : setEmailValid(false);
    } else {
      setEmailValid(false);
    }
  };

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
        {emailValid || email.length === 0
          ? ""
          : "Please Enter a Valid E-Mail Adress"}
      </p>
    </>
  );

  return Create_Email_Input;
};

export default Create_Email;
