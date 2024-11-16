import { NavLink } from "react-router-dom";
import { fullUserType } from "../Types/LandingTypes";

type propsType = {
  user: fullUserType | undefined;
};

const Navigation = ({ user }: propsType) => {
  return (
    <nav aria-label="HomePage-Nav">
      <ul className="main-nav">
        <NavLink to="/">
          <li className={user?.options?.color ? user.options.color : "Lcolor1"}>
            Home
          </li>
        </NavLink>
        <NavLink to="/table">
          <li className={user?.options?.color ? user.options.color : "Lcolor1"}>
            Coin Table
          </li>
        </NavLink>
        <NavLink to="/search">
          <li className={user?.options?.color ? user.options.color : "Lcolor1"}>
            Search a Coin
          </li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navigation;
