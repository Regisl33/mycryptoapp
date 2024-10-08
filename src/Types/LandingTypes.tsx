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
  id: number;
  oldPassword: string;
  resetDate: number;
};
export type userOptions = {
  darkMode?: boolean;
  color?: string;
  favorites?: string[];
};

export type fullUserType = {
  id: number;
  username: string;
  email: string;
  password: string;
  questions: securityQuestionsType;
  options?: userOptions;
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
