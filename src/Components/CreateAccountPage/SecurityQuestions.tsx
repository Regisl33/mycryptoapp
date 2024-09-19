import { FormEvent, useEffect, useState } from "react";
import {
  useAddUserMutation,
  useGetAllUsersQuery,
} from "../../Features/LandingPage/UserSlice";
import { fullUserType, SecQuestionPropsType } from "../../Types/LandingTypes";
import CreateSelect1 from "./CreateSelect1";
import CreateSelect2 from "./CreateSelect2";
import CreateSelect3 from "./CreateSelect3";
import HandleReturnLogin from "./HandleReturnLogin";
import { optionType, options } from "./Options";

const Security_Questions = ({ setDisplay, user }: SecQuestionPropsType) => {
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmited, setIsSubmited] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const { data: userData } = useGetAllUsersQuery("User");
  const [addUser] = useAddUserMutation();

  const getFullQuestion = (id: string): string => {
    let fullOption: string = "";
    options.map((option: optionType) =>
      parseInt(id) === option.value ? (fullOption = option.text) : null
    );
    return fullOption;
  };

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

  const postData = async (user: fullUserType) => {
    if (user) {
      try {
        await addUser(user).unwrap();
      } catch (err) {
        console.log(err);
      }
    } else {
      console.log("Post Data is incorrect");
    }
  };

  const handle_Submit = async (e: FormEvent) => {
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
    };
    await postData(fullUser);
    setIsSubmited(true);
  };

  const Security_Questions_Form = isSubmited ? (
    <HandleReturnLogin
      setDisplay={setDisplay}
      text="Your account has been created with succes!"
    />
  ) : (
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
        <button
          type="submit"
          className="btn1"
          disabled={!isValid}
          onClick={(e: FormEvent) => handle_Submit(e)}
        >
          Create Account
        </button>
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

  return Security_Questions_Form;
};

export default Security_Questions;
