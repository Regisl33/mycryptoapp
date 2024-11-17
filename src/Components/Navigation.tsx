import { NavLink, useLocation } from "react-router-dom";
import { fullUserType } from "../Types/LandingTypes";
import { useEffect, useState } from "react";

type propsType = {
  user: fullUserType | undefined;
};

const Navigation = ({ user }: propsType) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeLocation, setActiveLocation] = useState<string>("home");
  const location = useLocation();

  useEffect(() => {
    setActiveLocation(location.pathname.slice(1));
    if (user?.options?.color) {
      user.options.color[0] === "D"
        ? setIsDarkMode(true)
        : setIsDarkMode(false);
    }
  }, [user]);
  return (
    <nav aria-label="HomePage-Nav">
      <ul className="main-nav">
        <NavLink to="/home">
          <li
            className={
              activeLocation === "home"
                ? isDarkMode
                  ? "active darkLink"
                  : "active lightLink"
                : isDarkMode
                ? "darkLink"
                : "lightLink"
            }
          >
            Home
          </li>
        </NavLink>
        <NavLink to="/table">
          <li
            className={
              activeLocation === "table"
                ? isDarkMode
                  ? "active darkLink"
                  : "active lightLink"
                : isDarkMode
                ? "darkLink"
                : "lightLink"
            }
          >
            Coin Table
          </li>
        </NavLink>
        <NavLink to="/search">
          <li
            className={
              activeLocation === "search"
                ? isDarkMode
                  ? "active darkLink"
                  : "active lightLink"
                : isDarkMode
                ? "darkLink"
                : "lightLink"
            }
          >
            Search a Coin
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navigation;
