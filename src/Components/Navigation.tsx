import { NavLink, useLocation } from "react-router-dom";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import { useEffect, useState } from "react";

type propsType = {
  currentID: number;
  tempColor: string;
};

const Navigation = ({ currentID, tempColor }: propsType) => {
  const [activeLocation, setActiveLocation] = useState<string>("home");
  const location = useLocation();
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  useEffect(() => {
    setActiveLocation(location.pathname.slice(1));
  }, [location.pathname]);

  return (
    <nav aria-label="HomePage-Nav">
      <ul className="main-nav">
        <NavLink to="/home">
          <li
            className={
              activeLocation === "home"
                ? tempColor.length > 0
                  ? tempColor[0] === "D"
                    ? "active darkLink Dshadow"
                    : "active lightLink Lshadow"
                  : userData?.color[0] === "D"
                  ? "active darkLink Dshadow"
                  : "active lightLink Lshadow"
                : tempColor.length > 0
                ? tempColor[0] === "D"
                  ? "darkLink Dshadow"
                  : "lightLink Lshadow"
                : userData?.color[0] === "D"
                ? "darkLink Dshadow"
                : "lightLink Lshadow"
            }
          >
            Home
          </li>
        </NavLink>
        <NavLink to="/table">
          <li
            className={
              activeLocation === "table"
                ? tempColor.length > 0
                  ? tempColor[0] === "D"
                    ? "active darkLink Dshadow"
                    : "active lightLink Lshadow"
                  : userData?.color[0] === "D"
                  ? "active darkLink Dshadow"
                  : "active lightLink Lshadow"
                : tempColor.length > 0
                ? tempColor[0] === "D"
                  ? "darkLink Dshadow"
                  : "lightLink Lshadow"
                : userData?.color[0] === "D"
                ? "darkLink Dshadow"
                : "lightLink Lshadow"
            }
          >
            Coin Table
          </li>
        </NavLink>
        <NavLink to="/search">
          <li
            className={
              activeLocation === "search"
                ? tempColor.length > 0
                  ? tempColor[0] === "D"
                    ? "active darkLink Dshadow"
                    : "active lightLink Lshadow"
                  : userData?.color[0] === "D"
                  ? "active darkLink Dshadow"
                  : "active lightLink Lshadow"
                : tempColor.length > 0
                ? tempColor[0] === "D"
                  ? "darkLink Dshadow"
                  : "lightLink Lshadow"
                : userData?.color[0] === "D"
                ? "darkLink Dshadow"
                : "lightLink Lshadow"
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
