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
