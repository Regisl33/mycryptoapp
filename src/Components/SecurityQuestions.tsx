import { ChangeEvent, FormEvent, useState } from "react";
import { userType } from "../Types/LandingTypes";
import { RiArrowDropDownLine } from "react-icons/ri";

type propsType = {
  setDisplay: React.Dispatch<
    React.SetStateAction<
      | "account"
      | "login"
      | "password"
      | "home"
      | "security"
      | "verification"
      | "reset"
    >
  >;
  user: userType;
};

const SecurityQuestions = ({ setDisplay, user }: propsType) => {
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);

  const options: string[] = [
    "What is the name of your best friend from high school?",
    "What is your mother's maiden name?",
    "What was the name of your first pet?",
    "What is the name of the street you grew up on?",
    ">What is your father's middle name?",
    "What was your childhood nickname?",
    "What is your favorite color?",
    "What was the name of your elementary school?",
    "In what city were you born?",
    "What was your first car?",
  ];

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmited(true);
  };

  const handleReturnLogin = () => {
    setDisplay("login");
  };

  const content = isSubmited ? (
    <div className="main">
      <p>
        Your account has been created with succes!
        <u className="hot-Link" onClick={() => handleReturnLogin()}>
          Click Here to Login!
        </u>
      </p>
    </div>
  ) : (
    <form className="main">
      <div className="form-container">
        <label className="offscreen" htmlFor="question1Select">
          First Question
        </label>
        <div className="select-container">
          <RiArrowDropDownLine />
          <select
            className="select"
            name="question1Select"
            id="question1Select"
          >
            {options.map((option: string, index: number) => (
              <option selected={index === 0 ? true : false} value={index}>
                {option}
              </option>
            ))}
          </select>
        </div>
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
        <div className="select-container">
          <RiArrowDropDownLine />
          <select
            className="select"
            name="question2Select"
            id="question2Select"
          >
            {options.map((option: string, index: number) => (
              <option selected={index === 1 ? true : false} value={index}>
                {option}
              </option>
            ))}
          </select>
        </div>
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
        <div className="select-container">
          <RiArrowDropDownLine />
          <select
            className="select"
            name="question3Select"
            id="question3Select"
          >
            {options.map((option: string, index: number) => (
              <option selected={index === 2 ? true : false} value={index}>
                {option}
              </option>
            ))}
          </select>
        </div>
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
