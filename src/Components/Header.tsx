import Navigation from "./Navigation";
import { NavLink } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { useGetCurrentUserQuery } from "../Features/LandingPage/UserSlice";
import { useEffect } from "react";

type propsType = {
  currentID: number;
};

const Header = ({ currentID }: propsType) => {
  const { data: userData, isError, error } = useGetCurrentUserQuery(currentID);

  useEffect(() => {
    if (isError) {
      console.log(error);
    }
  }, []);

  return (
    <header className="account-header">
      <h1 className="title">Welcome {userData?.username}!</h1>
      <NavLink to="/settings">
        <IoSettingsOutline />
      </NavLink>
      <Navigation currentID={currentID} />
    </header>
  );
};

export default Header;
