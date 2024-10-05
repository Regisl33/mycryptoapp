import { ChangeEvent } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { optionType, options } from "./Options";

type CreateSelect3PropsType = {
  answer3: string;
  setAnswer3: React.Dispatch<React.SetStateAction<string>>;
  question3: string;
  setQuestion3: React.Dispatch<React.SetStateAction<string>>;
};

const CreateSelect3 = ({
  answer3,
  setAnswer3,
  question3,
  setQuestion3,
}: CreateSelect3PropsType) => {
  const CreateSelect3Select = (
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
            setQuestion3(e.target.value.toLowerCase())
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
          question3 !== "0" && answer3.length === 0
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
        {question3 !== "0" && answer3.length === 0
          ? "Please Enter An Answer"
          : ""}
      </p>
    </>
  );
  return CreateSelect3Select;
};

export default CreateSelect3;
