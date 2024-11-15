//This file contains the options that will be listed in the 3 selects from the security question page. They will also be used to list those questions when you want to reset your password.

//This is the option Type it is exported since it is used in other file
export type optionType = {
  value: number;
  text: string;
};

//This is the list of security questions you must choose from
export const options: optionType[] = [
  { value: 0, text: "Choose a sequrity question" },
  { value: 1, text: "What is the name of your best friend from high school?" },
  { value: 2, text: "What is your mother's maiden name?" },
  { value: 3, text: "What was the name of your first pet?" },
  { value: 4, text: "What is the name of the street you grew up on?" },
  { value: 5, text: "What is your father's middle name?" },
  { value: 6, text: "What was your childhood nickname?" },
  { value: 7, text: "What is your favorite color?" },
  { value: 8, text: "What was the name of your elementary school?" },
  { value: 9, text: "In what city were you born?" },
];
