import React from "react";

type propsType = {
  setDisplay: React.Dispatch<
    React.SetStateAction<
      | "account"
      | "login"
      | "password"
      | "home"
      | "security"
      | "verification"
      | "reset"
    >
  >;
  text: string;
};

const HandleReturnLogin = ({ setDisplay, text }: propsType) => {
  const handle_Return_Login = () => {
    setDisplay("login");
  };

  return (
    <div className="main">
      <p>
        {text}
        <u className="hot-Link" onClick={() => handle_Return_Login()}>
          Click Here to Login!
        </u>
      </p>
    </div>
  );
};

export default HandleReturnLogin;
