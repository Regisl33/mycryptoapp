//Import dependencies
import { useNavigate } from "react-router-dom";
//PropsType expect only 2 string value witch are gonna be the text that is gonna be displayed
type returnLoginPropsType = {
  text:
    | "Your account has been created with succes!"
    | "Your password has been reset!";
};

const HandleReturnLogin = ({ text }: returnLoginPropsType) => {
  //Declare Navigate
  const navigate = useNavigate();
  //Navigate to Login
  const handleReturnLogin = () => {
    navigate("/login");
  };
  //The Main class add the background and the Hot-Link class add the underlined text that is clickable and return to login
  const handleReturnLoginHTML = (
    <div className="main">
      <p>
        {text}
        <u className="hot-Link" onClick={() => handleReturnLogin()}>
          Click Here to Login!
        </u>
      </p>
    </div>
  );

  return handleReturnLoginHTML;
};

export default HandleReturnLogin;
