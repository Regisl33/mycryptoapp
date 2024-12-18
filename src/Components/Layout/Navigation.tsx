//Import Dependencies
import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
//Import Custom Hook
import { useGetCurrentUserQuery } from "../../Features/LandingPage/UserSlice";
//Import Custom Type
import { IDColorPropsType } from "../../Types/AppTypes";

const Navigation = ({ currentID, tempColor }: IDColorPropsType) => {
  //Define the State for the Location
  const [activeLocation, setActiveLocation] = useState<string>("home");
  //Define Location through useLocation Hook
  const location = useLocation();
  //Get Current User Data
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  //This useEffect makes sure their is no error with the userApi
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);
  //This UseEffect Sets the Active Location State Every Time The page Location Changes
  useEffect(() => {
    setActiveLocation(location.pathname.slice(1));
  }, [location.pathname]);
  //This Function Select the Appropriate Classes for our Link
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
  //Full Navigation Structure
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
