//Import Dependencies
import { ChangeEvent } from "react";
//Import the Dropdown Select Icon
import { RiArrowDropDownLine } from "react-icons/ri";
//Import the Options for the Select and their Type
import { optionType, options } from "./Options";
//Props Type to have controlled Inputs for the Question and the Answer
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
  //Return a Controlled Select and a Controlled Input for the Answer
  const CreateSelect3Select = (
    <>
      {/* offscreen class makes the label not visible on the page but still visible for google robots */}
      <label className="offscreen" htmlFor="question3Select">
        First Question
      </label>
      {/* select container to have the select and the icon */}
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
      {/* display the error if there is one */}
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
