//Type for the Username, Email, and Password. It is Used to Pass That Info From CreateAccount to SecurityQuestion
export type userType = {
  username: string;
  email: string;
  password: string;
};
//Type for the Question and Answer Defined in SecurituQuestion
export type securityQuestionsType = {
  question1: string;
  question2: string;
  question3: string;
  answer1: string;
  answer2: string;
  answer3: string;
};
//Type for the Password Change History, it Contains the old Password and the Date of the Password Reset
export type passwordChangeType = {
  oldPassword: string;
  resetDate: number;
};
//Type for the Full User Info in the DB
export type fullUserType = {
  id: number;
  username: string;
  email: string;
  password: string;
  questions: securityQuestionsType;
  color: string;
  range: number;
  favorites: string[];
  passwordHistory?: passwordChangeType;
};
//Type for the Password Reset Data
type passwordChangeEventType = {
  password: string;
  passwordHistory: passwordChangeType;
};
//Type for the Password Reset Full Event
export type passwordResetType = {
  passwordChange: passwordChangeEventType;
  id: number;
};
//Type for the Favorite Mutation Full Event
export type favoriteMutationType = {
  user: {
    favorites: string[];
  };
  id: number;
};
//Type for the Color Mutation Full Event
export type colorMutation = {
  user: {
    color: string;
  };
  id: number;
};
//Type for the Range Mutation Full Event
export type rangeMutation = {
  user: {
    range: number;
  };
  id: number;
};
//**********************PROPS TYPES*****************//
//Type for Current ID Props
export type currentIDPropsType = {
  currentID: number | undefined;
};
//Type for userType in a Props
export type SecQuestionPropsType = {
  user: userType;
};
