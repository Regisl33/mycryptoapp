import { NavLink, useLocation } from "react-router-dom";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import { useEffect, useState } from "react";

type propsType = {
  currentID: number;
};

const Navigation = ({ currentID }: propsType) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [activeLocation, setActiveLocation] = useState<string>("home");
  const location = useLocation();

  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
    setActiveLocation(location.pathname.slice(1));
    if (userData?.color) {
      userData.color[0] === "D" ? setIsDarkMode(true) : setIsDarkMode(false);
    }
  }, [userData]);
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
