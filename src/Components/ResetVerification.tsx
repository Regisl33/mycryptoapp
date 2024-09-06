import React, { ChangeEvent, FormEvent, useState } from "react";
import { propsTypeSetDisplay } from "./LoginPage";

const ResetVerification = ({ setDisplay }: propsTypeSetDisplay) => {
  const [securityAnswer, setSecurityAnswer] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setDisplay("reset");
  };

  const content = (
    <form className="main">
      <div className="reset-form-container">
        <h3>Question?</h3>
        <label className="offscreen" htmlFor="securityAnswer"></label>
        <input
          type="text"
          autoComplete="off"
          id="securityAnswer"
          placeholder="Enter your Answer"
          className="input"
          value={securityAnswer}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSecurityAnswer(e.target.value)
          }
        />
        <button type="button" className="btn2">
          Try another question
        </button>
        <button
          type="submit"
          className="btn1"
          onClick={(e: FormEvent) => handleSubmit(e)}
        >
          Reset Password
        </button>
      </div>
    </form>
  );
  return content;
};

export default ResetVerification;
