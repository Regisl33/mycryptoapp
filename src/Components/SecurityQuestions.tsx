import { ChangeEvent, FormEvent, useState } from "react";
import { propsTypeSetDisplay } from "./LoginPage";

const SecurityQuestions = ({ setDisplay }: propsTypeSetDisplay) => {
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmited(true);
  };

  const handleReturnLogin = () => {
    setDisplay("login");
  };

  const content = isSubmited ? (
    <p>
      Your account has been created with succes!
      <u onClick={() => handleReturnLogin()}>Click Here to Login!</u>
    </p>
  ) : (
    <form className="main">
      <div className="form-container">
        <label className="offscreen" htmlFor="question1Select">
          First Question
        </label>
        <select name="question1Select" id="question1Select">
          <option value="0">
            What is the name of your best friend from high school?
          </option>
          <option defaultValue="1">What is your mother's maiden name?</option>
          <option value="2">What was the name of your first pet?</option>
          <option value="3">
            What is the name of the street you grew up on?
          </option>
          <option value="4">What is your father's middle name?</option>
          <option value="5">What was your childhood nickname?</option>
          <option value="6">What is your favorite color?</option>
          <option value="7">
            What was the name of your elementary school?
          </option>
          <option value="8">In what city were you born?</option>
          <option value="9">What was your first car?</option>
        </select>
        <input
          type="text"
          className="input"
          required
          autoComplete="off"
          id="question1Input"
          placeholder="Enter your Answer"
          value={answer1}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAnswer1(e.target.value)
          }
        />
        <label className="offscreen" htmlFor="question2Select">
          First Question
        </label>
        <select name="question2Select" id="question2Select">
          <option defaultValue="0">
            What is the name of your best friend from high school?
          </option>
          <option value="1">What is your mother's maiden name?</option>
          <option value="2">What was the name of your first pet?</option>
          <option value="3">
            What is the name of the street you grew up on?
          </option>
          <option value="4">What is your father's middle name?</option>
          <option value="5">What was your childhood nickname?</option>
          <option value="6">What is your favorite color?</option>
          <option value="7">
            What was the name of your elementary school?
          </option>
          <option value="8">In what city were you born?</option>
          <option value="9">What was your first car?</option>
        </select>
        <input
          type="text"
          className="input"
          required
          autoComplete="off"
          id="question2Input"
          placeholder="Enter your Answer"
          value={answer2}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAnswer2(e.target.value)
          }
        />
        <label className="offscreen" htmlFor="question3Select">
          First Question
        </label>
        <select name="question3Select" id="question3Select">
          <option value="0">
            What is the name of your best friend from high school?
          </option>
          <option value="1">What is your mother's maiden name?</option>
          <option defaultValue="2">What was the name of your first pet?</option>
          <option value="3">
            What is the name of the street you grew up on?
          </option>
          <option value="4">What is your father's middle name?</option>
          <option value="5">What was your childhood nickname?</option>
          <option value="6">What is your favorite color?</option>
          <option value="7">
            What was the name of your elementary school?
          </option>
          <option value="8">In what city were you born?</option>
          <option value="9">What was your first car?</option>
        </select>
        <input
          type="text"
          className="input"
          required
          autoComplete="off"
          id="question3Input"
          placeholder="Enter your Answer"
          value={answer3}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setAnswer3(e.target.value)
          }
        />
        <button
          type="submit"
          className="btn1"
          onClick={(e: FormEvent) => handleSubmit(e)}
        >
          Create Account
        </button>
      </div>
    </form>
  );

  return content;
};

export default SecurityQuestions;
