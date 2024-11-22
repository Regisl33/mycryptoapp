import Navigation from "./Navigation";
import { NavLink } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import { useEffect } from "react";

type propsType = {
  currentID: number;
  tempColor: string;
};

const Header = ({ currentID, tempColor }: propsType) => {
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, [isError, error]);

  return (
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
      <Navigation currentID={currentID} />
    </header>
  );
};

export default Header;
