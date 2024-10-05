import { useNavigate } from "react-router-dom";

type propsType = {
  text: string;
};

const HandleReturnLogin = ({ text }: propsType) => {
  const navigate = useNavigate();

  const handleReturnLogin = () => {
    navigate("/login");
  };

  return (
    <div className="main">
      <p>
        {text}
        <u className="hot-Link" onClick={() => handleReturnLogin()}>
          Click Here to Login!
        </u>
      </p>
    </div>
  );
};

export default HandleReturnLogin;
