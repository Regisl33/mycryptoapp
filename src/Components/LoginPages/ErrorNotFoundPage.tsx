//Import Dependencies
import { useNavigate } from "react-router";

const ErrorNotFoundPage = () => {
  //Define UseNavigate
  const navigate = useNavigate();
  //This function return you to the login screen by deleting the session storage, the local storage and then reloading the page
  const handleReturnLogin = () => {
    if (localStorage.selectedID) {
      localStorage.removeItem("selectedID");
    }
    window.sessionStorage.clear();
    navigate("/login");
    window.location.reload();
  };
  //Error 404 page HTML return
  const error404page = (
    <div className="landing-container page404">
      <div className="main">
        <h2>
          Error 404 Page Not Found
          <u className="hot-link" onClick={() => handleReturnLogin()}>
            Return to login
          </u>
        </h2>
      </div>
    </div>
  );

  return error404page;
};

export default ErrorNotFoundPage;
