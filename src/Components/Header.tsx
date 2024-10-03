import Navigation from "./Navigation";
import { NavLink } from "react-router-dom";
import { IoSettingsOutline } from "react-icons/io5";

const Header = () => {
  return (
    <header>
      <h1>Welcome</h1>
      <NavLink to="/settings">
        <IoSettingsOutline />
      </NavLink>
      <Navigation />
    </header>
  );
};

export default Header;
