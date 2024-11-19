//Import Dependencies
import { FormEvent, useEffect, useState } from "react";
//Import GetUser and AddUser Redux Function
import {
  useAddUserMutation,
  useGetAllUsersQuery,
} from "../../Features/LandingPage/UserSlice";
//Import the 3 Select Component and the Return to Login Component
import CreateSelect1 from "./CreateSelect1";
import CreateSelect2 from "./CreateSelect2";
import CreateSelect3 from "./CreateSelect3";
import HandleReturnLogin from "./HandleReturnLogin";
//Import Options and their Type, with the Types for the user Props and the Security Question Props
import { fullUserType, SecQuestionPropsType } from "../../Types/LandingTypes";
import { optionType, options } from "./Options";

const SecurityQuestions = ({ user }: SecQuestionPropsType) => {
  //The Question Value State
  const [question1, setQuestion1] = useState("0");
  const [question2, setQuestion2] = useState("0");
  const [question3, setQuestion3] = useState("0");
  //Controlled Answer Input State
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  //Error Message State
  const [errorMessage, setErrorMessage] = useState("");
  //This State Makes Sure the Form is Valid Before Sumbitting
  const [isValid, setIsValid] = useState(false);
  //This State controlled if the Form is Submitted or Not
  const [isSubmited, setIsSubmited] = useState(false);
  //Get User Data from Redux Store
  const { data: userData } = useGetAllUsersQuery("User");
  //Define Add User Mutation to Add User to the Redux Store
  const [addUser] = useAddUserMutation();
  //This Function Receive a Question ID and return the full Text of the Corresponding Question
  const getFullQuestion = (id: string): string => {
    let fullOption: string = "";
    options.map((option: optionType) =>
      parseInt(id) === option.value ? (fullOption = option.text) : null
    );
    return fullOption;
  };
  //Try to post the full user to Redux if it fails catch and log the appropriate Error
  const postData = async (user: fullUserType) => {
    try {
      if (user) {
        await addUser(user).unwrap();
      } else {
        throw new Error("The User Data Entered Was Incorrect Try Again");
      }
    } catch (err) {
      console.log(err);
    }
  };
  //Sumbit Function, use getFullQuestion to get the corresponding question, then create the fullUser Object. Calls postData to post the user and set the Submit State accordingly
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    let fullQuestion1: string = getFullQuestion(question1);
    let fullQuestion2: string = getFullQuestion(question2);
    let fullQuestion3: string = getFullQuestion(question3);
    let fullUser: fullUserType = {
      id: userData?.ids ? userData?.ids.length : 0,
      username: user.username,
      email: user.email,
      password: user.password,
      questions: {
        question1: fullQuestion1,
        question2: fullQuestion2,
        question3: fullQuestion3,
        answer1,
        answer2,
        answer3,
      },
      options: {
        color: "Lcolor1",
      },
    };
    await postData(fullUser);
    setIsSubmited(true);
  };
  //This useEffect Checks if the form is Valid it sets the error accordingly if not
  useEffect(() => {
    if (
      question1 !== question2 &&
      question1 !== "0" &&
      question2 !== question3 &&
      question2 !== "0" &&
      question3 !== question1 &&
      question3 !== "0" &&
      answer1.length > 0 &&
      answer2.length > 0 &&
      answer3.length > 0
    ) {
      setIsValid(true);
      setErrorMessage("");
    } else {
      setErrorMessage("Please Select 3 différents questions!");
      setIsValid(false);
    }
  }, [question1, question2, question3, answer1, answer2, answer3]);
  //HTML return base on the Submitted State
  const SecurityQuestionsForm = isSubmited ? (
    // if the form is submitted, return the handle Return to Login Components
    <HandleReturnLogin text="Your account has been created with succes!" />
  ) : (
    //if not returns the form with our 3 select components
    <form className="main">
      <div className="form-container">
        <CreateSelect1
          answer1={answer1}
          setAnswer1={setAnswer1}
          question1={question1}
          setQuestion1={setQuestion1}
        />
        <CreateSelect2
          answer2={answer2}
          setAnswer2={setAnswer2}
          question2={question2}
          setQuestion2={setQuestion2}
        />
        <CreateSelect3
          answer3={answer3}
          setAnswer3={setAnswer3}
          question3={question3}
          setQuestion3={setQuestion3}
        />
        {/* Submit button, is only clickable if the form is valid and calls the submit function when clicked */}
        <button
          type="submit"
          className="btn1"
          disabled={!isValid}
          onClick={(e: FormEvent) => handleSubmit(e)}
        >
          Create Account
        </button>
        {/* This paragraph displays the error message only if needed  */}
        <p className="error-text">
          {errorMessage.length > 0 &&
          answer1.length > 0 &&
          answer2.length > 0 &&
          answer3.length > 0
            ? errorMessage
            : null}
        </p>
      </div>
    </form>
  );

  return SecurityQuestionsForm;
};

export default SecurityQuestions;
