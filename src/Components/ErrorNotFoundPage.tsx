import { useNavigate } from "react-router";

const ErrorNotFoundPage = () => {
  const navigate = useNavigate();

  const handleReturnLogin = () => {
    navigate("/login");
  };
  return (
    <div className="main">
      <h2>
        Error 404 Page Not Found
        <u className="hot-link" onClick={() => handleReturnLogin()}>
          Return to login
        </u>
      </h2>
    </div>
  );
};

export default ErrorNotFoundPage;
