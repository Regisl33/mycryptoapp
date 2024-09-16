export type propsTypeSetDisplay = {
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
};

export type userType = {
  username: string;
  email: string;
  password: string;
};

export type securityQuestionsType = {
  question1: String;
  question2: String;
  question3: String;
  answer1: String;
  answer2: String;
  answer3: String;
};

export type fullUserType = {
  id: number;
  username: string;
  email: string;
  password: string;
  questions: securityQuestionsType;
};

export type actionType = {
  type: string;
  payload: userType | securityQuestionsType;
};

export type userStateType = {
  user: userType;
  fullUser: fullUserType;
};

const userStateType = {
  user: {
    username: "",
    email: "",
    password: "",
  },
  fullUser: {
    username: "",
    email: "",
    password: "",
    questions: {
      question1: "",
      question2: "",
      question3: "",
      answer1: "",
      answer2: "",
      answer3: "",
    },
  },
};

export const options: string[] = [
  "What is the name of your best friend from high school?",
  "What is your mother's maiden name?",
  "What was the name of your first pet?",
  "What is the name of the street you grew up on?",
  "What is your father's middle name?",
  "What was your childhood nickname?",
  "What is your favorite color?",
  "What was the name of your elementary school?",
  "In what city were you born?",
  "What was your first car?",
];
