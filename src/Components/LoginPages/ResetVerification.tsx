//Import Dependencies
import {
  ChangeEvent,
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
//Import Fetch User Hook
import { useGetCurrentUserQuery } from "../../Features/LandingPage/UserSlice";
//Import Types for the Id Props
import { currentIDPropsType } from "../../Types/LandingTypes";

const ResetVerification = ({ currentID }: currentIDPropsType) => {
  //This State Handle the Question Switching
  const [questionNum, setQuestionNum] = useState(0);
  //This State Contains the Displayed Question
  const [activeQuestion, setActiveQuestion] = useState("");
  //This State is to Have a Controlled Input
  const [securityAnswer, setSecurityAnswer] = useState("");
  //Error State
  const [errorMessage, setErrorMessage] = useState("");
  //Getting the Data from the User DataBase
  const {
    data: userData,
    isError,
    error,
  } = useGetCurrentUserQuery(currentID as string);
  //Define Navigate
  const navigate = useNavigate();
  //Get the questions for the current User
  const getQuestions = useCallback((): string[] => {
    let questionsArray: string[] = [];
    if (userData) {
      questionsArray = [
        userData.questions.question1,
        userData.questions.question2,
        userData.questions.question3,
      ];
    }
    return questionsArray;
  }, [userData]);
  //Get the answers for the current User
  const getAnswers = (): string[] => {
    let answersArray: string[] = [];
    if (userData) {
      answersArray = [
        userData.questions.answer1,
        userData.questions.answer2,
        userData.questions.answer3,
      ];
    }
    return answersArray;
  };
  //This function uses questionNum and getQuestion to set the active question
  const handleQuestionSwitch = useCallback(
    (num: number) => {
      let questions = getQuestions();
      setActiveQuestion(questions[num]);
    },
    [getQuestions]
  );
  const questionNumLogic = (): number => {
    let num: number = 0;
    if (questionNum === 2) {
      setQuestionNum(0);
    } else {
      setQuestionNum(questionNum + 1);
      num = questionNum + 1;
    }
    return num;
  };
  //Submit Function, use getAnswers and getQuestion to verify if the answer match the user question
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    let questions = getQuestions();
    let answers = getAnswers();
    let questionPos: number = 3;

    questions.map((question: string, index: number) =>
      question === activeQuestion ? (questionPos = index) : null
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
  //This useEffect makes sure that there is a userID if not return to login
  useEffect(() => {
    if (currentID) {
      handleQuestionSwitch(0);
    } else {
      navigate("/login");
    }
  }, [userData, currentID, navigate, handleQuestionSwitch]);
  useEffect(() => {
    if (isError) {
      setErrorMessage("We couldn't reach the server");
      console.log(error);
    }
  }, [error, isError]);
  //This button allows to change the current question:
  const questionButton = (
    <button
      type="button"
      className="btn2 swap-question"
      onClick={() => handleQuestionSwitch(questionNumLogic())}
    >
      Try another question
    </button>
  );
  //Submit Button, is only clickable if there is an answer and calls the submit function
  const submitButton = (
    <button
      type="submit"
      className="btn1"
      onClick={(e: FormEvent) => handleSubmit(e)}
      disabled={securityAnswer.length === 0 ? true : false}
    >
      Reset Password
    </button>
  );
  //Return HTML Page Content
  const content = (
    <form className="main">
      <div className="form-container">
        {/* Displays the activeQuestion */}
        <h3 className="security-question title">{activeQuestion}</h3>
        {/* offscreen class makes the label not visible on the page but still visible for google robots */}
        <label className="offscreen" htmlFor="securityAnswer"></label>
        {/* controlled input for the security Answer */}
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
        {/* This paragraph displays the error message if needed */}
        <p className="error-text">{errorMessage}</p>
        {questionButton}
        {submitButton}
      </div>
    </form>
  );
  return content;
};

export default ResetVerification;
