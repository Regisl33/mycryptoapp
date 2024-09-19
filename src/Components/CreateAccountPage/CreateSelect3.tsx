import { ChangeEvent } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { optionType, options } from "./Options";

type Create_Select3_Props_Type = {
  answer3: string;
  setAnswer3: React.Dispatch<React.SetStateAction<string>>;
  question3: string;
  setQuestion3: React.Dispatch<React.SetStateAction<string>>;
};

const Create_Select3 = ({
  answer3,
  setAnswer3,
  question3,
  setQuestion3,
}: Create_Select3_Props_Type) => {
  const Create_Select3_Select = (
    <>
      <label className="offscreen" htmlFor="question3Select">
        First Question
      </label>
      <div className="select-container">
        <RiArrowDropDownLine />
        <select
          className="select"
          name="question3Select"
          id="question3Select"
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setQuestion3(e.target.value)
          }
        >
          {options.map((option: optionType) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        className={
          question3.length > 0 && answer3.length === 0
            ? "input error-input"
            : "input"
        }
        autoComplete="off"
        id="question3Input"
        placeholder="Enter your Answer"
        value={answer3}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAnswer3(e.target.value)
        }
      />
      <p className="error-text">
        {question3.length > 0 && answer3.length === 0
          ? "Please Enter An Answer"
          : ""}
      </p>
    </>
  );
  return Create_Select3_Select;
};

export default Create_Select3;
