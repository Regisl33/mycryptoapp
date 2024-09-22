import { ChangeEvent } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { optionType, options } from "./Options";

type Create_Select2_Props_Type = {
  answer2: string;
  setAnswer2: React.Dispatch<React.SetStateAction<string>>;
  question2: string;
  setQuestion2: React.Dispatch<React.SetStateAction<string>>;
};

const Create_Select2 = ({
  answer2,
  setAnswer2,
  question2,
  setQuestion2,
}: Create_Select2_Props_Type) => {
  const Create_Select2_Select = (
    <>
      <label className="offscreen" htmlFor="question2Select">
        First Question
      </label>
      <div className="select-container">
        <RiArrowDropDownLine />
        <select
          className="select"
          name="question2Select"
          id="question2Select"
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setQuestion2(e.target.value)
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
          question2 !== "0" && answer2.length === 0
            ? "input error-input"
            : "input"
        }
        autoComplete="off"
        id="question2Input"
        placeholder="Enter your Answer"
        value={answer2}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAnswer2(e.target.value)
        }
      />
      <p className="error-text">
        {question2 !== "0" && answer2.length === 0
          ? "Please Enter An Answer"
          : ""}
      </p>
    </>
  );
  return Create_Select2_Select;
};

export default Create_Select2;
