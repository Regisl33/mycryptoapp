import { ChangeEvent, FormEvent, useState } from "react";
import { propsTypeSetDisplay } from "./LoginPage";
import { log } from "console";

const SecurityQuestions = ({ setDisplay }: propsTypeSetDisplay) => {
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

  const handleQuestion = (i: number): string | undefined => {
    try {
      if (i) {
        switch (i) {
          case 0:
            return "First Question";
          case 1:
            return "Second Question";
          case 2:
            return "Third Question";
          default:
            throw new Error("Unknown case in sécurity question switch");
        }
      } else {
        throw new Error(
          "Didn't receive 'I' parameter in the loop function (security Quesiton Loop)"
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };

  const handleValue = (i: number): string | undefined => {
    try {
      if (i) {
        switch (i) {
          case 0:
            return answer1;
          case 1:
            return answer2;
          case 2:
            return answer3;
          default:
            throw new Error("Unknown case in sécurity question value switch");
        }
      } else {
        throw new Error(
          "Didn't receive 'I' parameter in the loop function (security Quesiton value Loop)"
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };

  const handleChange = (i: number, value: string) => {
    try {
      if (i || value) {
        switch (i) {
          case 0:
            setAnswer1(value);
            break;
          case 1:
            setAnswer2(value);
            break;
          case 2:
            setAnswer3(value);
            break;
          default:
            throw new Error("Unknown case in sécurity question change switch");
        }
      } else {
        throw new Error(
          "Didn't receive 'I' parameter in the loop function (security Quesiton change Loop)"
        );
      }
    } catch (err) {
      if (err instanceof Error) {
        console.log(err.message);
      }
    }
  };

  const returnContent = () => {
    for (let i: number = 0; i < 3; i++) {
      return (
        <>
          <label className="offscreen" htmlFor={`question${i}Select`}>
            {handleQuestion(i)}
          </label>
          <select
            className="select"
            name={`question${i}Select`}
            id={`question${i}Select`}
          >
            {options.map((option: string, index: number) => (
              <option selected={i === index ? true : false} value={index}>
                {option}
              </option>
            ))}
          </select>
          <input
            type="text"
            className="input"
            autoComplete="off"
            id={`question${i}Input`}
            placeholder="Enter your Answer"
            value={handleValue(i)}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              handleChange(i, e.target.value)
            }
          />
        </>
      );
    }
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
        <select className="select" name="question1Select" id="question1Select">
          <option value="0">
            What is the name of your best friend from high school?
          </option>
          <option selected value="1">
            What is your mother's maiden name?
          </option>
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
        <select className="select" name="question2Select" id="question2Select">
          <option selected value="0">
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
        <select className="select" name="question3Select" id="question3Select">
          <option value="0">
            What is the name of your best friend from high school?
          </option>
          <option value="1">What is your mother's maiden name?</option>
          <option selected value="2">
            What was the name of your first pet?
          </option>
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
