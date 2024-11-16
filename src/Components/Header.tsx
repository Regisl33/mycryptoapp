import Navigation from "./Navigation";
import { NavLink } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";
import { fullUserType } from "../Types/LandingTypes";

type propsType = {
  user: fullUserType | undefined;
};

const Header = ({ user }: propsType) => {
  return (
    <header className="account-header">
      <h1 className="title">Welcome {user?.username}!</h1>
      <NavLink to="/settings">
        <IoSettingsOutline />
      </NavLink>
      <Navigation user={user} />
    </header>
  );
};

export default Header;
