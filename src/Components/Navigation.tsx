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

  const classSelector = (location: string): string => {
    let classname = "";
    activeLocation === location
      ? tempColor.length > 0
        ? tempColor[0] === "D"
          ? (classname = "active darkLink Dshadow")
          : (classname = "active lightLink Lshadow")
        : userData?.color[0] === "D"
        ? (classname = "active darkLink Dshadow")
        : (classname = "active lightLink Lshadow")
      : tempColor.length > 0
      ? tempColor[0] === "D"
        ? (classname = "darkLink Dshadow")
        : (classname = "lightLink Lshadow")
      : userData?.color[0] === "D"
      ? (classname = "darkLink Dshadow")
      : (classname = "lightLink Lshadow");

    return classname;
  };

  const nav = (
    <nav aria-label="HomePage-Nav">
      <ul className="main-nav">
        <NavLink to="/home">
          <li className={classSelector("home")}>Home</li>
        </NavLink>
        <NavLink to="/table">
          <li className={classSelector("table")}>Coin Table</li>
        </NavLink>
        <NavLink to="/search">
          <li className={classSelector("search")}>Search a Coin</li>
        </NavLink>
      </ul>
    </nav>
  );

  return nav;
};

export default Navigation;
