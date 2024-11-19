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
export type userOptions = {
  color: string;
  favorites?: coinDataType[];
};

export type fullUserType = {
  id: number;
  username: string;
  email: string;
  password: string;
  questions: securityQuestionsType;
  options: userOptions;
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

type favoriteType = {
  options: {
    favorites: coinDataType[];
  };
};

export type favoriteMutationType = {
  options: favoriteType;
  id: number;
};

type userColor = {
  options: {
    color: string;
  };
};

export type colorMutation = {
  options: userColor;
  id: number;
};
