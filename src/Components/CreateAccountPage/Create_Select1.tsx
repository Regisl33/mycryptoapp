import { ChangeEvent } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { options } from "./SecurityQuestions";

type Create_Select1_Props_Type = {
  answer1: string;
  answer2: string;
  answer3: string;
  setAnswer1: React.Dispatch<React.SetStateAction<string>>;
};

const Create_Select1 = ({
  answer1,
  answer2,
  answer3,
  setAnswer1,
}: Create_Select1_Props_Type) => {
  const Create_Select1_Select = (
    <>
      <label className="offscreen" htmlFor="question1Select">
        First Question
      </label>
      <div className="select-container">
        <RiArrowDropDownLine />
        <select className="select" name="question1Select" id="question1Select">
          {options.map((option: string, index: number) => (
            <option
              key={index}
              selected={index === 0 ? true : false}
              value={index}
            >
              {option}
            </option>
          ))}
        </select>
      </div>
      <input
        type="text"
        className="input"
        required
        autoComplete="off"
        id="question1Input"
        placeholder="Enter your Answer"
        value={answer1}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setAnswer1(e.target.value)
        }
      />
    </>
  );
  return <div></div>;
};

export default Create_Select1;
