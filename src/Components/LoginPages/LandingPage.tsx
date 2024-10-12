//Import dependencies
import { Outlet, useNavigate, useLocation } from "react-router-dom";

const LandingPage = () => {
  //Get Actual Year for the footer
  const year = new Date().getFullYear();
  //Define Navigate and Locaation
  const navigate = useNavigate();
  const location = useLocation();
  //This is our Header, with our title and button that allows your to login or Create an Account. They only display if we are on the landing page.
  const header = (
    <header>
      <h1 className="title">Welcome to CryptoMaster</h1>
      {location.pathname === "/" ? ( //<-- This makes it so the buttons only display if we are on the landing page
        <div className="header-btn-container">
          <button className="btn2" onClick={() => navigate("/login")}>
            Sign In
          </button>
          <button className="btn2" onClick={() => navigate("/create-account")}>
            Sign Up
          </button>
        </div>
      ) : null}
    </header>
  );
  //The footer that uses the year Const
  const footer = (
    <footer>
      <p>Powered by Coingecko Api</p>
      <p className="copyright">All right reserved &copy; {year}</p>
    </footer>
  );
  //Landing page HTML structure. It display the header, the footer, and the main part is define by our outlet.
  const LandingPageStructure = (
    <div className="landing-container">
      {header}
      <div className="landing-main-container">
        <Outlet />
      </div>
      {footer}
    </div>
  );

  return LandingPageStructure;
};

export default LandingPage;
