import React, { ChangeEvent, FormEvent, useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetVerification = () => {
  const [securityAnswer, setSecurityAnswer] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    navigate("/password-reset");
  };

  const content = (
    <form className="main">
      <div className="form-container">
        <h3 className="security-question title">Question?</h3>
        <label className="offscreen" htmlFor="securityAnswer"></label>
        <input
          type="text"
          autoComplete="off"
          id="securityAnswer"
          placeholder="Enter your Answer"
          className="input"
          value={securityAnswer}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSecurityAnswer(e.target.value.toLowerCase())
          }
        />
        <button type="button" className="btn2 swap-question">
          Try another question
        </button>
        <button
          type="submit"
          className="btn1"
          onClick={(e: FormEvent) => handleSubmit(e)}
          disabled={securityAnswer.length === 0 ? true : false}
        >
          Reset Password
        </button>
      </div>
    </form>
  );
  return content;
};

export default ResetVerification;
