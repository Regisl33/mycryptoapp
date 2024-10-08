import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { currentIDPropsType } from "../../Types/AppTypes";
import { useGetAllUsersQuery } from "../../Features/LandingPage/UserSlice";

const ResetVerification = ({ currentID }: currentIDPropsType) => {
  const [activeQuestion, setActiveQuestion] = useState("");
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [questionNum, setQuestionNum] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { data: userApiData, isError, error } = useGetAllUsersQuery("User");

  const getQuestions = (): string[] => {
    let questionsArray: string[] = [];
    if (!isError) {
      if (userApiData?.entities && currentID) {
        questionsArray = [
          userApiData.entities[currentID].questions.question1,
          userApiData.entities[currentID].questions.question2,
          userApiData.entities[currentID].questions.question3,
        ];
      } else {
        console.log(
          "This Error Should Never Occur Due To Previous Verification But if it Does it because we couldn't get Api Data or the user ID"
        );
      }
    } else {
      setErrorMessage("We couldn't reach the server");
      console.log(error);
    }
    return questionsArray;
  };

  const getAnswers = (): string[] => {
    let answersArray: string[] = [];
    if (userApiData?.entities && currentID) {
      answersArray = [
        userApiData.entities[currentID].questions.answer1,
        userApiData.entities[currentID].questions.answer2,
        userApiData.entities[currentID].questions.answer3,
      ];
    } else {
      console.log(
        "This Error Should Never Occur Due To Previous Verification But if it Does it because we couldn't get Api Data or the user ID"
      );
    }
    return answersArray;
  };

  const handleQuestionSwitch = () => {
    let questions = getQuestions();
    if (questionNum === 2) {
      setQuestionNum(0);
    } else {
      setQuestionNum(questionNum + 1);
    }
    setActiveQuestion(questions[questionNum]);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let questions = getQuestions();
    let answers = getAnswers();
    let questionPos: number = 3;

    questions.map((question: string, index: number) =>
      question === activeQuestion
        ? (questionPos = index)
        : console.log(question)
    );

    if (answers[questionPos] === securityAnswer) {
      navigate("/password-reset");
      setErrorMessage("");
    } else {
      setErrorMessage(
        "We couldn't validate your identity, try another question"
      );
    }
  };

  useEffect(() => {
    if (currentID) {
      handleQuestionSwitch();
    } else {
      navigate("/login");
    }
  }, []);

  const content = (
    <form className="main">
      <div className="form-container">
        <h3 className="security-question title">{activeQuestion}</h3>
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
        <p className="error-text">{errorMessage}</p>
        <button
          type="button"
          className="btn2 swap-question"
          onClick={() => handleQuestionSwitch()}
        >
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
