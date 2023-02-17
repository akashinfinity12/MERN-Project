import React from "react";

import { NavLink } from "react-router-dom";
import "./NavLinks.css";

const NavLinks = () => {
  return (
    <ul className="nav-links">
      <li>
        <NavLink end to="/">
          ALL USERS
        </NavLink>
      </li>
      <li>
        <NavLink to="/u1/places">MY PLACES</NavLink>
      </li>
      <li>
        <NavLink to="/places/new">ADD PLACES</NavLink>
      </li>
      <li>
        <NavLink to="/login">LOGIN</NavLink>
      </li>
    </ul>
  );
};

export default NavLinks;
