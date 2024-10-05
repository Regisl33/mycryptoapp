import { ChangeEvent, FormEvent, useState } from "react";
import { useGetAllUsersQuery } from "../../Features/LandingPage/UserSlice";
import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const { data: userApiData, error, isError } = useGetAllUsersQuery("User");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isError) {
      setErrorMessage("Sorry, we couldn't reach the server, please try again");
      console.log(error);
    } else if (userApiData?.ids) {
      let accountID: number | null = null;
      userApiData.ids.map((id) =>
        userApiData.entities[id].email ||
        userApiData.entities[id].username === inputValue
          ? (accountID = id)
          : console.log(id)
      );

      if (accountID) {
        setErrorMessage("");
        navigate("/security-verification");
      } else {
        setErrorMessage("We couldn't find your account");
      }
    } else {
      setErrorMessage("Sorry, we couldn't reach the server, please try again");
    }
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
        <p className="error-text">{errorMessage}</p>
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
