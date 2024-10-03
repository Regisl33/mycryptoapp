import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav aria-label="HomePage-Nav">
      <ul>
        <NavLink to="/">
          <li>Home</li>
        </NavLink>
        <NavLink to="/Table">
          <li>Coin Table</li>
        </NavLink>
        <NavLink to="/search">
          <li>Search a Coin</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default Navigation;
