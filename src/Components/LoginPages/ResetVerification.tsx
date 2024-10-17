//Import Dependencies
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
//Import Fetch User Hook
import { useGetAllUsersQuery } from "../../Features/LandingPage/UserSlice";
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
  const { data: userApiData, isError, error } = useGetAllUsersQuery("User");
  //Define Navigate
  const navigate = useNavigate();
  //Define The Error for this component if it fail the TS verification
  const consoleError =
    "This Error Should not happen Ts verif/If it does data or Id are missing";
  //Get the questions for the current User
  const getQuestions = (): string[] => {
    //Define the Question Variable
    let questionsArray: string[] = [];
    //Ts Verification for ID and Data
    if (userApiData?.entities && currentID) {
      //set the question data based on the user ID
      questionsArray = [
        userApiData.entities[currentID].questions.question1,
        userApiData.entities[currentID].questions.question2,
        userApiData.entities[currentID].questions.question3,
      ];
    } else {
      console.log(consoleError);
    }
    //Return the Data
    return questionsArray;
  };
  //Get the answers for the current User
  const getAnswers = (): string[] => {
    //Define the Answer Variable
    let answersArray: string[] = [];
    //Ts Verification for ID and Data
    if (userApiData?.entities && currentID) {
      //set the answers data based on the user ID
      answersArray = [
        userApiData.entities[currentID].questions.answer1,
        userApiData.entities[currentID].questions.answer2,
        userApiData.entities[currentID].questions.answer3,
      ];
    } else {
      console.log(consoleError);
    }
    //Return the Data
    return answersArray;
  };
  //this function uses questionNum and getQuestion to set the active question
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

    if (isError) {
      setErrorMessage("We couldn't reach the server");
      console.log(error);
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
