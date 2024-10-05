import { Outlet, useNavigate, useLocation } from "react-router-dom";

const LandingPage = () => {
  const year = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="landing-container">
      <header>
        <h1 className="title">Welcome to CryptoMaster</h1>
        {location.pathname === "/" ? (
          <div className="header-btn-container">
            <button className="btn2" onClick={() => navigate("/login")}>
              Sign In
            </button>
            <button
              className="btn2"
              onClick={() => navigate("/create-account")}
            >
              Sign Up
            </button>
          </div>
        ) : null}
      </header>
      <div className="landing-main-container">
        <Outlet />
      </div>
      <footer>
        <p>Powered by Coingecko Api</p>
        <p className="copyright">All right reserved &copy; {year}</p>
      </footer>
    </div>
  );
};

export default LandingPage;
