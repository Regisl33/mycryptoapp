import { ChangeEvent, FormEvent, useState } from "react";
import { propsTypeSetDisplay } from "../Types/LandingTypes";
import { useGetAllUsersQuery } from "../Features/LandingPage/UserSlice";

const ForgotPassword = ({ setDisplay }: propsTypeSetDisplay) => {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { data: userApiData, error, isError } = useGetAllUsersQuery("User");

  const handleReset = () => {
    setErrorMessage("");
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isError) {
      setErrorMessage("Sorry, we couldn't reach the server, please try again");
      console.log(error);
    } else if (userApiData?.ids) {
      let accountID = userApiData.ids.filter(
        (id) =>
          userApiData.entities[id].email ||
          userApiData.entities[id].username === inputValue
      );

      if (accountID.length > 0) {
        //Logik
      } else {
        setErrorMessage("We couldn't find your account");
      }
    } else {
      setErrorMessage("Sorry, we couldn't reach the server, please try again");
    }
    setDisplay("verification");
  };

  const content = (
    <form className="main">
      <div className="form-container">
        <label className="offscreen" htmlFor="passwordReset">
          Enter your Username or Email adress
        </label>
        <input
          className="input"
          autoComplete="off"
          type="text"
          id="passwordReset"
          placeholder="Enter your Username or Email adress"
          value={inputValue}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setInputValue(e.target.value.toLowerCase().trim())
          }
        />
        <button
          type="submit"
          className="btn1"
          disabled={inputValue.length > 0 ? false : true}
          onClick={(e: FormEvent) => handleSubmit(e)}
        >
          Send
        </button>
      </div>
    </form>
  );

  return content;
};

export default ForgotPassword;
