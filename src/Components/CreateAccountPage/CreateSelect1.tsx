//Import Dependencies
import { ChangeEvent } from "react";
//Import the Dropdown Select Icon
import { RiArrowDropDownLine } from "react-icons/ri";
//Import the Options for the Select and their Type
import { optionType, options } from "./Options";
//Props Type to have controlled Inputs for the Question and the Answer
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
  //Return a Controlled Select and a Controlled Input for the Answer
  const CreateSelect1Select = (
    <>
      {/* offscreen class makes the label not visible on the page but still visible for google robots */}
      <label className="offscreen" htmlFor="question1Select">
        First Question
      </label>
      {/* select container to have the select and the icon */}
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
          {/* map the option object */}
          {options.map((option: optionType) => (
            <option key={option.value} value={option.value}>
              {option.text}
            </option>
          ))}
        </select>
      </div>
      {/* controlled input for the answer */}
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
      {/* display the error if there is one */}
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
