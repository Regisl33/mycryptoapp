import { ChangeEvent, FormEvent, useState } from "react";
import { propsTypeSetDisplay } from "../Types/LandingTypes";

const ForgotPassword = ({ setDisplay }: propsTypeSetDisplay) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDisplay("verification");
  };

  const content = (
    <form className="main">
      <div className="form-container">
        <label className="offscreen" htmlFor="passwordReset">
          Enter your email adress
        </label>
        <input
          className="input"
          autoComplete="off"
          type="text"
          id="passwordReset"
          placeholder="Enter your email adress"
          value={email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
        />
        <button
          type="submit"
          className="btn1"
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
