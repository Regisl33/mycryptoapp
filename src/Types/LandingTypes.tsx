import { coinDataType } from "./AppTypes";

export type userType = {
  username: string;
  email: string;
  password: string;
};

export type securityQuestionsType = {
  question1: string;
  question2: string;
  question3: string;
  answer1: string;
  answer2: string;
  answer3: string;
};

export type passwordChangeType = {
  oldPassword: string;
  resetDate: number;
};

export type fullUserType = {
  id: number;
  username: string;
  email: string;
  password: string;
  questions: securityQuestionsType;
  color: string;
  favorites: coinDataType[];
  passwordHistory?: passwordChangeType;
};

export type actionType = {
  type: string;
  payload: userType | securityQuestionsType;
};

export type userStateType = {
  user: userType;
  fullUser: fullUserType;
};

type passwordChangeEventType = {
  password: string;
  passwordHistory: passwordChangeType;
};

export type passwordResetType = {
  passwordChange: passwordChangeEventType;
  id: number;
};

export type currentIDPropsType = {
  currentID: number | undefined;
};

export type SecQuestionPropsType = {
  user: userType;
};

export type favoriteMutationType = {
  user: {
    favorites: coinDataType[];
  };
  id: number;
};

export type colorMutation = {
  user: {
    color: string;
  };
  id: number;
};
