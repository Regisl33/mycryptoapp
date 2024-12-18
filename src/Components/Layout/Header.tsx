//Import Dependencies
import { useEffect } from "react";
import { NavLink } from "react-router-dom";
//Import Custom Hooks and Functions
import { useGetCurrentUserQuery } from "../../Features/LandingPage/UserSlice";
//Import Navigation Component
import Navigation from "./Navigation";
//Import Icon
import { IoSettingsOutline } from "react-icons/io5";
//Import Custom Type
import { IDColorPropsType } from "../../Types/AppTypes";

const Header = ({ currentID, tempColor }: IDColorPropsType) => {
  //Get Current User Data
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);
  //This useEffect makes sure their is no error with the userApi
  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  const HeaderStructure = (
    <header className="account-header">
      <h1
        className={
          tempColor.length > 0
            ? tempColor[0] === "D"
              ? "title Dshadow"
              : "title Lshadow"
            : userData?.color[0] === "D"
            ? "title Dshadow"
            : "title Lshadow"
        }
      >
        Welcome {userData?.username}!
      </h1>
      <NavLink to="/settings">
        <IoSettingsOutline />
      </NavLink>
      <Navigation currentID={currentID} tempColor={tempColor} />
    </header>
  );

  return HeaderStructure;
};

export default Header;
