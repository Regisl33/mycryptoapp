//Define and Export Function to Define the Color of Something Based on a Value
export const colorPicker = (num?: number): string => {
  if (num && num >= 0) {
    return "rgb(0,255,102)";
  } else {
    return "rgb(255,51,0)";
  }
};
