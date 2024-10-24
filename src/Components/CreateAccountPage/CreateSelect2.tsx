//Import Dependencies
import { ChangeEvent } from "react";
//Import the Dropdown Select Icon
import { RiArrowDropDownLine } from "react-icons/ri";
//Import the Options for the Select and their Type
import { optionType, options } from "./Options";
//Props Type to have controlled Inputs for the Question and the Answer
type CreateSelect2PropsType = {
  answer2: string;
  setAnswer2: React.Dispatch<React.SetStateAction<string>>;
  question2: string;
  setQuestion2: React.Dispatch<React.SetStateAction<string>>;
};

const CreateSelect2 = ({
  answer2,
  setAnswer2,
  question2,
  setQuestion2,
}: CreateSelect2PropsType) => {
  //Return a Controlled Select and a Controlled Input for the Answer
  const CreateSelect2Select = (
    <>
      {/* offscreen class makes the label not visible on the page but still visible for google robots */}
      <label className="offscreen" htmlFor="question2Select">
        First Question
      </label>
      {/* select container to have the select and the icon */}
      <div className="select-container">
        <RiArrowDropDownLine />
        <select
          className="select"
          name="question2Select"
          id="question2Select"
          onChange={(e: ChangeEvent<HTMLSelectElement>) =>
            setQuestion2(e.target.value.toLowerCase())
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
      {/* display the error if there is one */}
      <p className="error-text">
        {question2 !== "0" && answer2.length === 0
          ? "Please Enter An Answer"
          : ""}
      </p>
    </>
  );
  return CreateSelect2Select;
};

export default CreateSelect2;
