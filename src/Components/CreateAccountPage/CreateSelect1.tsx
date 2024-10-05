import { ChangeEvent } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { optionType, options } from "./Options";

type CreateSelect1PropsType = {
  answer1: string;
  setAnswer1: React.Dispatch<React.SetStateAction<string>>;
  question1: string;
  setQuestion1: React.Dispatch<React.SetStateAction<string>>;
};

const CreateSelect1 = ({
  answer1,
  setAnswer1,
  question1,
  setQuestion1,
}: CreateSelect1PropsType) => {
  const CreateSelect1Select = (
    <>
      <label className="offscreen" htmlFor="question1Select">
        First Question
      </label>
      <div className="select-container">
        <RiArrowDropDownLine />
        <select
          className="select"
          name="question1Select"
          id="question1Select"
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setQuestion1(e.target.value)
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
          question1 !== "0" && answer1.length === 0
            ? "input error-input"
            : "input"
        }
        autoComplete="off"
        id="question1Input"
        placeholder="Enter your Answer"
        value={answer1}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAnswer1(e.target.value.toLowerCase())
        }
      />
      <p className="error-text">
        {question1 !== "0" && answer1.length === 0
          ? "Please Enter An Answer"
          : ""}
      </p>
    </>
  );
  return CreateSelect1Select;
};

export default CreateSelect1;
